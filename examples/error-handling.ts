import MicronClient from '../src';

async function main() {
  const client = new MicronClient();

  try {
    // Try to get an invalid token
    const invalidTokenAddress = 'invalid_address';
    const tokenInfo = await client.getToken(invalidTokenAddress);
    console.log('Token Information:', tokenInfo);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to get token:', error.message);
    } else {
      console.error('Failed to get token:', String(error));
    }
  }

  try {
    // Try to get a non-existent agent
    const invalidAgentId = 'non_existent_id';
    const agent = await client.getAgent(invalidAgentId);
    console.log('Agent Details:', agent);
  } catch (error) {
    console.error('Failed to get agent:', error.message);
  }
}

main(); 