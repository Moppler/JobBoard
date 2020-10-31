class JobModel {
  constructor(jobData) {
    this.title = jobData.title;
    this.location = jobData.location;
    this.salary = jobData.salary;
    this.jobType = jobData.jobType;
    this.summary = jobData.summary;
    this.datePosted = jobData.datePosted;
  }

  static async fetchAllJobs() {
    const mockJobData = [
      {
        title: 'Test Title',
        location: 'London',
        salary: '£50,000',
        jobType: 'Permanent',
        summary: 'Lorem ipsum dolor sit amet.',
        datePosted: new Date().toDateString(),
      },
    ];
    return mockJobData.map((jobData) => new JobModel(jobData));
  }
}

module.exports = JobModel;
