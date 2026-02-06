export const getA2ABaseURL = ({ agentID = '' }: { agentID: string }) => {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:3000`
  } else {
    return `https://${agentID}.agents.inter-site.com`
  }
}
