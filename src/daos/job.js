const { DateTime } = require('luxon');

const mockJobData = [
  {
    id: 1,
    title: 'Test Title',
    location: 'London',
    salary: '£50,000',
    jobType: 'Permanent',
    summary: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam semper at nunc vel congue. Nulla vel aliquet metus. Nam at consequat nulla. Nullam tortor odio, vulputate et nunc at, interdum volutpat massa. Fusce id porta ligula. Mauris ultrices, nibh vel tristique vestibulum, risus dui ornare purus, vel bibendum enim odio vitae nulla. Pellentesque vehicula, nunc eu interdum egestas, ex diam gravida nibh, quis vehicula nisl est sed dui. Donec libero nibh, dapibus et est at, tincidunt maximus magna. Etiam vehicula suscipit metus. Cras ut sapien blandit, tempus tortor ac, eleifend sem. Maecenas bibendum metus quis venenatis tempus.',
    datePosted: DateTime.local(2020, 1, 1),
  },
  {
    id: 2,
    title: 'Test Title 2',
    location: 'London',
    salary: '£50,000',
    jobType: 'Permanent',
    summary: 'Lorem ipsum dolor sit amet.',
    description:
      'Nam arcu justo, rutrum ut tortor sagittis, facilisis dignissim tortor. Vestibulum finibus mi a nunc dictum, sit amet tempor orci iaculis. Praesent tincidunt interdum urna, ut viverra justo interdum a. Duis ut dui sit amet augue consequat commodo. Duis sapien eros, efficitur at ultricies quis, fermentum sit amet velit. Aliquam ante odio, vulputate ac efficitur sit amet, imperdiet ac felis. Suspendisse quis felis luctus, rutrum arcu sed, tempor lacus. Donec malesuada dolor augue, viverra volutpat nisl placerat sit amet. Duis aliquam ligula eget commodo volutpat.',
    datePosted: DateTime.local(2020, 1, 2),
  },
];

class JobDao {
  async fetchAllJobs() {
    return mockJobData;
  }

  /**
   * Returns a job that matches the specified Id.
   *
   * @param {number} jobId
   */
  async fetchJobById(jobId) {
    return mockJobData.find((job) => job.id === jobId);
  }
}

module.exports = JobDao;
