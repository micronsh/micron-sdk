import MicronClient from '../src';
import { ChatMessage } from '../src/types';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function chat(client: MicronClient, agentId: string, messages: ChatMessage[]) {
  const response = await client.chat(agentId, messages);
  console.log('\nAgent:', response.data.response);
  return response.data.response;
}

async function main() {
  const client = new MicronClient();

  try {
    // Get available agents
    const agents = await client.listAgents();
    if (agents.data.length === 0) {
      console.log('No agents available');
      return;
    }

    const agentId = agents.data[0].id;
    const messages: ChatMessage[] = [];

    console.log('Chat with AI Agent (type "exit" to quit)\n');

    while (true) {
      const question = await new Promise<string>(resolve => {
        rl.question('You: ', resolve);
      });

      if (question.toLowerCase() === 'exit') break;

      messages.push({ role: 'user', content: question });
      const response = await chat(client, agentId, messages);
      messages.push({ role: 'assistant', content: response });
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
}

main(); 