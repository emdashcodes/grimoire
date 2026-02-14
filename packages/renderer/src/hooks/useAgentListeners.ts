import { useEffect } from 'react';
import { PUSH } from '@grimoire/shared';
import type { PushMap } from '@grimoire/shared';
import { useStore } from '../store';

/**
 * Registers IPC listeners for agent push events.
 * Must be called exactly ONCE in the component tree (at the App level).
 * Separate from useAgent so that multiple components can use useAgent
 * without duplicating listener registrations.
 */
export function useAgentListeners() {
  const handleSessionUpdate = useStore((s) => s.handleSessionUpdate);
  const setAgentStatus = useStore((s) => s.setAgentStatus);
  const setStreaming = useStore((s) => s.setStreaming);
  const setLoadingSession = useStore((s) => s.setLoadingSession);
  const setPendingPermission = useStore((s) => s.setPendingPermission);
  const setCurrentSession = useStore((s) => s.setCurrentSession);
  const setSessionList = useStore((s) => s.setSessionList);

  useEffect(() => {
    const unsubs: Array<() => void> = [];

    // On mount, check if the agent is already connected (e.g. after HMR reload).
    // The main process won't re-emit status events, so we probe proactively.
    window.grimoire.invoke('agent:status', { agentId: 'claude-code' }).then((status) => {
      const isReady = status === 'ready' || status === 'busy';
      if (isReady) {
        setAgentStatus(status);
        window.grimoire.invoke('session:list', undefined as void).then((sessions) => {
          setSessionList(sessions);
          if (sessions.length > 0 && !useStore.getState().currentSession) {
            const latest = sessions.reduce((a, b) => (a.createdAt > b.createdAt ? a : b));
            setCurrentSession(latest);
          }
        }).catch(() => {});
      }
    }).catch(() => {});

    unsubs.push(
      window.grimoire.on(PUSH.SESSION_UPDATE, (data: PushMap[typeof PUSH.SESSION_UPDATE]) => {
        handleSessionUpdate(data.update);
      })
    );

    unsubs.push(
      window.grimoire.on(PUSH.AGENT_STATUS_CHANGED, (data: PushMap[typeof PUSH.AGENT_STATUS_CHANGED]) => {
        setAgentStatus(data.status);

        // When the agent becomes ready and we have no session selected,
        // fetch sessions and auto-select the latest one.
        const isReady = data.status === 'ready' || data.status === 'busy';
        if (isReady && !useStore.getState().currentSession) {
          window.grimoire.invoke('session:list', undefined as void).then((sessions) => {
            setSessionList(sessions);
            if (sessions.length > 0 && !useStore.getState().currentSession) {
              const latest = sessions.reduce((a, b) => (a.createdAt > b.createdAt ? a : b));
              setCurrentSession(latest);
            }
          }).catch(() => {});
        }
      })
    );

    unsubs.push(
      window.grimoire.on(PUSH.PROMPT_DONE, () => {
        setStreaming(false);
      })
    );

    unsubs.push(
      window.grimoire.on(PUSH.SESSION_LOAD_DONE, () => {
        setLoadingSession(false);
      })
    );

    unsubs.push(
      window.grimoire.on(PUSH.PERMISSION_REQUEST, (data: PushMap[typeof PUSH.PERMISSION_REQUEST]) => {
        setPendingPermission(data);
      })
    );

    return () => unsubs.forEach((fn) => fn());
  }, [handleSessionUpdate, setAgentStatus, setStreaming, setLoadingSession, setPendingPermission, setCurrentSession, setSessionList]);
}
