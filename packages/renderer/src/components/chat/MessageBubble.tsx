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

/**
 * Extract thinking blocks from text content.
 * Returns array of thinking block contents and the remaining text without thinking tags.
 */
function extractThinkingBlocks(text: string): { thinking: string[]; remainingText: string } {
  const thinkingRegex = /<thinking>([\s\S]*?)<\/thinking>/g;
  const thinking: string[] = [];
  let match;

  while ((match = thinkingRegex.exec(text)) !== null) {
    thinking.push(match[1].trim());
  }

  const remainingText = text.replace(thinkingRegex, '').trim();

  return { thinking, remainingText };
}

export function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';
  const textContent = message.content
    .filter((c) => c.type === 'text')
    .map((c) => (c as { type: 'text'; text: string }).text)
    .join('');

  const { thinking, remainingText } = isUser
    ? { thinking: [], remainingText: textContent }
    : extractThinkingBlocks(textContent);

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
        {/* Thinking blocks (agent only, before text content) */}
        {!isUser && thinking.length > 0 && (
          <div className="max-w-[85%] mb-1.5">
            {thinking.map((thinkingContent, idx) => (
              <ThinkingBlock key={idx} content={thinkingContent} />
            ))}
          </div>
        )}

        {/* Text content */}
        {remainingText && (
          <div
            className={cn(
              'inline-block text-left rounded-2xl px-4 py-2.5 max-w-[85%]',
              isUser
                ? 'bg-grimoire-accent text-white rounded-br-md'
                : 'bg-grimoire-surface rounded-bl-md'
            )}
          >
            {isUser ? (
              <p className="text-sm whitespace-pre-wrap">{remainingText}</p>
            ) : (
              <div className="chat-markdown text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {remainingText}
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
