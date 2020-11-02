const { DateTime } = require('luxon');

class JobDao {
  async fetchAllJobs() {
    const mockJobData = [
      {
        title: 'Test Title',
        location: 'London',
        salary: '£50,000',
        jobType: 'Permanent',
        summary: 'Lorem ipsum dolor sit amet.',
        datePosted: DateTime.local(2020, 1, 1),
      },
      {
        title: 'Test Title 2',
        location: 'London',
        salary: '£50,000',
        jobType: 'Permanent',
        summary: 'Lorem ipsum dolor sit amet.',
        datePosted: DateTime.local(2020, 1, 2),
      },
    ];
    return mockJobData;
  }
}

module.exports = JobDao;
