import MicronClient from '../src';

async function main() {
  // Initialize the client
  const client = new MicronClient();

  try {
    // Get token information
    const tokenAddress = 'your_token_address';
    const tokenInfo = await client.getToken(tokenAddress);
    console.log('Token Information:', tokenInfo.data);

    // List all available agents
    const agents = await client.listAgents();
    console.log('Available Agents:', agents.data);

    // Get a specific agent
    if (agents.data.length > 0) {
      const agentId = agents.data[0].id;
      const agent = await client.getAgent(agentId);
      console.log('Agent Details:', agent.data);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main(); 