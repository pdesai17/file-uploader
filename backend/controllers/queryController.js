exports.handleQuery = (req, res) => {
  const query = req.body.query;
  let answer;

  if (query === "What tools is the candidate familiar with?") {
    answer = `
          The candidate is familiar with a variety of tools. For web development, they use React, Angular, Node.js, and Nest.js. They have experience with RESTful APIs, database optimization, and deploying web applications. They are also proficient with cloud platforms such as AWS and Azure.
    In terms of DevOps, they have a strong background in SDLC, version control using GitHub, and Azure DevOps. They also have hands-on experience with Docker, Kubernetes, and performance monitoring tools like Datadog.
    `;
  }

  if (query === "Is Candidate having 2 years of experience?") {
    answer =
      "Yes! Candidate is having 2+ years of experience as Angular and React Native developer.";
  }

  setTimeout(() => {
    res.json({ answer });
  }, 3000);
};
