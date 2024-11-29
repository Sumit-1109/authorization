var transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "786541114b2b66e374c6ba7626a37232"
    }
  });