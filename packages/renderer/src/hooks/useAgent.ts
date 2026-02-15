import { useCallback } from 'react';
import type { AgentSession, ConfigOption } from '@grimoire/shared';
import { useStore } from '../store';

/**
 * Hook that provides agent actions and state to components.
 * Can be called from multiple components safely.
 *
 * IPC listener registration is handled separately by useAgentListeners
 * (called once at the App level) to prevent duplicate event handlers.
 */
export function useAgent() {
  const {
    agentStatus,
    currentSession,
    sessionList,
    isStreaming,
    isLoadingSession,
    configOptions,
    slashCommands,
    pendingPermission,
    workingFolder,
    setAgentStatus,
    setCurrentSession,
    setSessionList,
    addUserMessage,
    setStreaming,
    setConfigOptions,
    setPendingPermission,
    switchToSession,
  } = useStore();

  /** Fetch the session list from the main process */
  const fetchSessionList = useCallback(async () => {
    try {
      const sessions = await window.grimoire.invoke('session:list', undefined as void);
      setSessionList(sessions);
    } catch (err) {
      console.error('Failed to fetch session list:', err);
    }
  }, [setSessionList]);

  /** Initialize the agent and create a session */
  const connect = useCallback(async (cwd?: string) => {
    try {
      setAgentStatus('connecting');
      await window.grimoire.invoke('agent:initialize', { agentId: 'claude-code' });
      const resolvedCwd = cwd ?? workingFolder ?? await window.grimoire.invoke('app:get-cwd', undefined as void);
      const session = await window.grimoire.invoke('session:create', {
        agentId: 'claude-code',
        cwd: resolvedCwd,
      });
      setCurrentSession(session);
      // Refresh session list after creating
      fetchSessionList();
    } catch (err) {
      console.error('Failed to connect agent:', err);
      setAgentStatus('error');
    }
  }, [setAgentStatus, setCurrentSession, fetchSessionList, workingFolder]);

  /** Create a new session on an already-connected agent */
  const createSession = useCallback(async (agentId: string, cwd?: string) => {
    try {
      const resolvedCwd = cwd ?? workingFolder ?? await window.grimoire.invoke('app:get-cwd', undefined as void);
      const session = await window.grimoire.invoke('session:create', {
        agentId,
        cwd: resolvedCwd,
      });
      // switchToSession saves current messages to cache, then sets new (empty) session
      switchToSession(session);
      fetchSessionList();
    } catch (err) {
      console.error('Failed to create session:', err);
    }
  }, [switchToSession, fetchSessionList, workingFolder]);

  /** Switch to an existing session, restoring cached messages */
  const switchSession = useCallback((session: AgentSession) => {
    switchToSession(session);
  }, [switchToSession]);

  /** Send a text prompt. Returns false if the message couldn't be sent. */
  const sendMessage = useCallback(async (text: string): Promise<boolean> => {
    if (!currentSession || isStreaming) return false;

    const content = [{ type: 'text' as const, text }];
    addUserMessage(content);
    setStreaming(true);

    // Fire prompt asynchronously — don't block the caller
    window.grimoire.invoke('prompt:send', {
      sessionId: currentSession.sessionId,
      content,
    }).catch((err) => {
      console.error('Prompt failed:', err);
      setStreaming(false);
    });

    return true;
  }, [currentSession, isStreaming, addUserMessage, setStreaming]);

  /** Cancel the current prompt */
  const cancelPrompt = useCallback(async () => {
    if (!currentSession) return;
    await window.grimoire.invoke('prompt:cancel', {
      sessionId: currentSession.sessionId,
    });
  }, [currentSession]);

  /** Respond to a permission request by selecting an option */
  const respondToPermission = useCallback(async (requestId: string, optionId: string) => {
    try {
      await window.grimoire.invoke('permission:respond', {
        requestId,
        outcome: { outcome: 'selected', optionId },
      });
    } catch (err) {
      console.error('Failed to respond to permission:', err);
    }
    setPendingPermission(null);
  }, [setPendingPermission]);

  /** Cancel a permission request */
  const cancelPermission = useCallback(async (requestId: string) => {
    try {
      await window.grimoire.invoke('permission:respond', {
        requestId,
        outcome: { outcome: 'cancelled' },
      });
    } catch (err) {
      console.error('Failed to cancel permission:', err);
    }
    setPendingPermission(null);
  }, [setPendingPermission]);

  /** Set a config option value */
  const setConfigOption = useCallback(async (configId: string, value: string) => {
    if (!currentSession) return;
    try {
      const result = await window.grimoire.invoke('session:set-config', {
        sessionId: currentSession.sessionId,
        configId,
        value,
      });
      setConfigOptions(result.configOptions);
    } catch (err) {
      console.error('Failed to set config option:', err);
    }
  }, [currentSession, setConfigOptions]);

  return {
    agentStatus,
    currentSession,
    sessionList,
    isStreaming,
    isLoadingSession,
    configOptions,
    slashCommands,
    pendingPermission,
    connect,
    createSession,
    sendMessage,
    cancelPrompt,
    switchSession,
    fetchSessionList,
    setConfigOption,
    respondToPermission,
    cancelPermission,
  };
}
