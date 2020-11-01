class JobDao {
  async fetchAllJobs() {
    const mockJobData = [
      {
        title: 'Test Title',
        location: 'London',
        salary: '£50,000',
        jobType: 'Permanent',
        summary: 'Lorem ipsum dolor sit amet.',
        datePosted: new Date(),
      },
    ];
    return mockJobData;
  }
}

module.exports = JobDao;
