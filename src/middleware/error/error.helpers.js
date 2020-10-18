class NotFoundError extends Error {
  constructor() {
    super();
    this.status = 404;
    this.text = 'Content not found';
  }
}

module.exports = { NotFoundError };
