import MicronClient from '../src';
import { ChatMessage } from '../src/types';

async function main() {
  const client = new MicronClient();

  try {
    // Get available agents
    const agents = await client.listAgents();
    
    if (agents.data.length === 0) {
      console.log('No agents available');
      return;
    }

    // Select the first agent
    const agentId = agents.data[0].id;

    // Prepare chat messages
    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: 'Can you analyze this token: 6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN'
      }
    ];

    // Chat with the agent
    const response = await client.chat(agentId, messages);
    console.log('Agent Response:', response.data);

    // Continue the conversation
    messages.push({
      role: 'assistant',
      content: response.data.response
    });

    messages.push({
      role: 'user',
      content: 'What are the main risk factors?'
    });

    const followUpResponse = await client.chat(agentId, messages);
    console.log('Follow-up Response:', followUpResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

main(); 