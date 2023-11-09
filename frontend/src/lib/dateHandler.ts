const dateHandler = (publicationDate: string) => {
  const dateObj = new Date(publicationDate);
  return Intl.DateTimeFormat('en-EN', { dateStyle: 'medium' }).format(dateObj);
};

export default dateHandler;
