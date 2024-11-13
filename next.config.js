module.exports = {
  async headers() {
    return [
      {
        source: '/Utc/:lang/Build/:file*',
        headers: [
          {
            key: 'Content-Encoding',
            value: 'br',
          },
        ],
      },
    ]
  },
} 