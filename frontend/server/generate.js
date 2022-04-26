const faker = require('faker');

let database = {chats:[]};
let authorData = {author:[]};
let currentAuthor = {id: 1000, displayName: 'I am', avatar: 'my'}

for(let i = 1; i <= 100; i++) {
  authorData.author.push(
    {uid: i.toString(), displayName: faker.name.findName(), avatar: faker.image.animals(200, 200, true)}
  );
}

for (let i = 1; i <= 100; i++) {
  database.chats.push({
    id: i,
    author: authorData.author[authorData.author.length - i],
    lastMessage: new Date(),
    messages: [
      {author: authorData.author[authorData.author.length - i], value: faker.lorem.paragraph(3), date: new Date() },
      {author: authorData.author[authorData.author.length - i], value: faker.lorem.paragraph(3), date: new Date() },
      {author: currentAuthor, value: faker.lorem.paragraph(3), date: new Date() },
      {author: authorData.author[authorData.author.length - i], value: faker.lorem.paragraph(3), date: new Date() },
      {author: authorData.author[authorData.author.length - i], value: faker.lorem.paragraph(3), date: new Date() },
      {author: currentAuthor, value: faker.lorem.paragraph(3), date: new Date() },
      {author: currentAuthor, value: faker.lorem.paragraph(3), date: new Date() },
      {author: authorData.author[authorData.author.length - i], value: faker.lorem.paragraph(3), date: new Date() },
      {author: authorData.author[authorData.author.length - i], value: faker.lorem.paragraph(3), date: new Date() },
      {author: currentAuthor, value: faker.lorem.paragraph(3), date: new Date() },
      {author: authorData.author[authorData.author.length - i], value: faker.lorem.paragraph(3), date: new Date() },
      {author: authorData.author[authorData.author.length - i], value: faker.lorem.paragraph(3), date: new Date() },
      {author: currentAuthor, value: faker.lorem.paragraph(3), date: new Date() },
      {author: currentAuthor, value: faker.lorem.paragraph(3), date: new Date() }
    ]
  })
}
console.log(JSON.stringify(database));
