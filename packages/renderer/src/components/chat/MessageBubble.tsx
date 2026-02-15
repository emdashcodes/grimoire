import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { ConversationMessage } from '@grimoire/shared';
import { ToolCallCard } from './ToolCallCard';
import { ThinkingBlock } from './ThinkingBlock';

interface Props {
  message: ConversationMessage;
}

interface ParsedContent {
  thinkingBlocks: string[];
  regularText: string;
}

/**
 * Parse thinking blocks from agent message text.
 * Returns thinking blocks separately from regular text.
 */
function parseThinkingBlocks(text: string): ParsedContent {
  const thinkingRegex = /<thinking>([\s\S]*?)<\/thinking>/g;
  const thinkingBlocks: string[] = [];
  let match: RegExpExecArray | null;

  // Extract all thinking blocks
  while ((match = thinkingRegex.exec(text)) !== null) {
    thinkingBlocks.push(match[1].trim());
  }

  // Remove thinking blocks from regular text
  const regularText = text.replace(thinkingRegex, '').trim();

  return { thinkingBlocks, regularText };
}

export function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';
  const rawTextContent = message.content
    .filter((c) => c.type === 'text')
    .map((c) => (c as { type: 'text'; text: string }).text)
    .join('');

  // Parse thinking blocks for agent messages
  const { thinkingBlocks, regularText } = isUser
    ? { thinkingBlocks: [], regularText: rawTextContent }
    : parseThinkingBlocks(rawTextContent);

  const textContent = regularText;

  return (
    <div className={cn('flex gap-3 py-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
          isUser ? 'bg-grimoire-accent/20 text-grimoire-accent' : 'bg-grimoire-surface text-grimoire-text-muted'
        )}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Content */}
      <div className={cn('flex-1 min-w-0', isUser ? 'text-right' : 'text-left')}>
        {/* Thinking blocks (agent only, rendered before regular text) */}
        {!isUser && thinkingBlocks.length > 0 && (
          <div className="max-w-[85%]">
            {thinkingBlocks.map((thinking, idx) => (
              <ThinkingBlock key={idx} content={thinking} />
            ))}
          </div>
        )}

        {textContent && (
          <div
            className={cn(
              'inline-block text-left rounded-2xl px-4 py-2.5 max-w-[85%]',
              isUser
                ? 'bg-grimoire-accent text-white rounded-br-md'
                : 'bg-grimoire-surface rounded-bl-md'
            )}
          >
            {isUser ? (
              <p className="text-sm whitespace-pre-wrap">{textContent}</p>
            ) : (
              <div className="chat-markdown text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {textContent}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}

        {/* Tool calls */}
        {message.toolCalls?.map((tc) => (
          <ToolCallCard key={tc.toolCallId} toolCall={tc} />
        ))}
      </div>
    </div>
  );
}
