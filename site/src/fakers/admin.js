const faker = require('faker')
const crypto = require('crypto')
const dayjs = require('dayjs')

const users = []
const activities = []

const posts = []
const tags = []
const typePost = ['Question', 'Suggestion', 'Problem', 'Opinion', 'Discussion']
const replies = []
const comments = []

const postVotes = []
const replyVotes = []

const minWBody = 5
const maxWBody = 15
const minTitle = 1
const maxTitle = 5
const nUsers = 10
const nPosts = 20
const maxTagsPerUser = 5
const minTagsPerUser = 0
const maxTagsPerPost = 15
const minTagsPerPost = 1
const maxPostPerUser = 5
const maxRepliesPerPost = 10
const maxCommentPerReply = 2

const timeSteps = [40923, 82130, 821382, 8213828]
const randomtimeSteps = [100000, 500000, 100000000]

const range = (from, to) => [...Array(to - from)].map((_, i) => i + from)

function shuffle (array) {
  let currentIndex = array.length; let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}

const fs = require('fs')

const path = require('path')
const csv = require('csv-parse/sync')

const PATH = 'fake'

const data = fs.readFileSync(path.resolve(PATH, 'QueryResults.csv'),
  { encoding: 'utf8', flag: 'r' })
var tagsResults = csv.parse(data, {
  columns: true,
  skip_empty_lines: true
})

tagsResults = shuffle(tagsResults)

function sha256 (message) {
  return crypto
    .createHash('sha256')
    .update(message)
    .digest('hex')
}

var activityCount = 1
var tagsCount = 1
var postsCount = 1
var repliesCount = 1
var commentsCount = 1

const startDate = dayjs('2020-01-01')

function userFake (i, date) {
  // userDate = userDate.add(1 + parseInt(Math.random() * 10, 10), 'day')
  const user = {
    userId: parseInt(i, 10),
    createdAt: date.toString(),
    uuid: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: sha256(faker.internet.password(20)),
    reputation: parseInt(Math.random() * 10000, 10),
    avatar: faker.image.image()
  }

  activities.push({
    activityId: activityCount,
    createdAt: userDate.toString(),
    type: 'createAccount',
    userId: user.userId,
    data: {
      username: user.username,
      email: user.email,
      userId: user.userId,
      uuid: user.uuid
    }
  })
  activityCount++

  return user
}

function pickRandomNumbersWithoutRepeat (min, max, nNumbers) {
  const numbers = []
  for (let i = 0; i < nNumbers; i++) {
    var p
    do {
      const n = Math.floor(Math.random() * (max - min + 1)) + min
      p = numbers.includes(n)
      if (!p) {
        numbers.push(n)
      }
    } while (p)
  }
  return numbers
}

function randomIntFromInterval (min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function tagsFake (date, author) {
  const pickedTag = tagsResults.pop()
  const tag = {
    createdAt: date.toString(),
    author,
    name: pickedTag.tagName,
    description: pickedTag.Excerpt,
    tagId: tagsCount
  }
  activities.push({
    activityId: activityCount,
    createdAt: date.toString(),
    type: 'createTag',
    userId: author,
    data: {
      name: pickedTag.tagName,
      description: pickedTag.Excerpt,
      tagId: tagsCount
    }
  })
  activityCount++
  tagsCount++
  return tag
}

// TODO: downvotes & upvotes activities & table & tag
function postFake (author, date) {
  const pickedTags = pickRandomNumbersWithoutRepeat(1, tags.length, randomIntFromInterval(minTagsPerPost, maxTagsPerPost))
  const post = {
    title: faker.lorem.sentence(randomIntFromInterval(minTitle, maxTitle)),
    body: faker.lorem.sentence(randomIntFromInterval(minWBody, maxWBody)),
    type: typePost[(randomIntFromInterval(0, 4))],
    tags: pickedTags,
    createdAt: date.toString(),
    downvotes: 0,
    upvotes: 0,
    views: 0,
    author,
    postId: postsCount
  }

  activities.push({
    activityId: activityCount,
    createdAt: date.toString(),
    type: 'createVote',
    userId: author,
    data: {
      postId: postsCount,
      title: post.title,
      body: post.body,
      type: post.type,
      tags: post.tags
    }
  })

  activityCount++
  postsCount++
  return post
}

function repliesFake (author, date, postId) {
  const reply = {
    body: faker.lorem.sentence(randomIntFromInterval(minWBody, maxWBody)),
    createdAt: date.toString(),
    downvotes: 0,
    upvotes: 0,
    views: 0,
    postId, // Reply to post n°
    replyId: repliesCount, // Id of THIS reply
    author
  }

  activities.push({
    activityId: activityCount,
    createdAt: date.toString(),
    type: 'createVote',
    userId: author,
    data: {
      postId, // Reply to post n°
      replyId: reply.replyId,
      body: reply.body
    }
  })

  activityCount++
  repliesCount++
  return reply
}

function commentFake (author, date, parent) {
  const comment = {
    body: faker.lorem.sentence(randomIntFromInterval(minWBody, maxWBody)),
    date: date.toString(),
    postId: parent.postId,
    replyId: parent.replyId,
    commentId: commentsCount,
    author
  }

  activities.push({
    activityId: activityCount,
    createdAt: date.toString(),
    type: 'createComment',
    userId: author,
    data: {
      postId: parent.postId,
      replyId: parent.replyId,
      commentId: commentsCount,
      body: comment.body
    }
  })

  activityCount++
  commentsCount++
  return comment
}

postVoteCount = 1
function postVoteFake (author, post, date) {
  const vote = {
    voteId: postVoteCount,
    vote: Math.random() < 0.75 ? 1 : -1,
    createdAt: date.toString(),
    userId: author,
    postId: post.postId
  }

  activities.push({
    activityId: activityCount,
    createdAt: date.toString(),
    type: 'postVote',
    userId: author,
    data: {
      postId: post.postId,
      vote: vote.vote
    }
  })

  if (vote.vote === 1) {
    post.upvotes++
  } else {
    post.downvotes++
  }

  activityCount++
  postVoteCount++

  return vote
}

replyVoteCount = 1
function replyVoteFake (author, reply, date) {
  const vote = {
    voteId: postVoteCount,
    vote: Math.random() < 0.75 ? 1 : -1,
    createdAt: date.toString(),
    userId: author,
    replyId: reply.replyId
  }

  activities.push({
    activityId: activityCount,
    createdAt: date.toString(),
    type: 'replyVote',
    userId: author,
    data: {
      replyId: reply.replyId,
      vote: vote.vote
    }
  })

  activityCount++
  replyVoteCount++

  return vote
}

users.push({
  userId: 1,
  createdAt: startDate.toString(),
  uuid: faker.datatype.uuid(),
  username: 'admin',
  email: 'admin@admin.com',
  password: sha256('password'),
  reputation: 69420,
  avatar: faker.image.image()
})

var tagDate = startDate

for (const _ of range(1, 40)) {
  tagDate = tagDate.add(15, 'minute')
  tags.push(tagsFake(tagDate, 1))
}

function hasAlreadyVotedPost (userId, postId) {
  return postVotes.some(vote => vote.userId === userId && vote.postId === postId)
}

function hasAlreadyVotedReply (userId, replyId) {
  return replyVotes.some(vote => vote.userId === userId && vote.replyId === replyId)
}

function allRepliesOfPost (postId) {
  return replies.filter(reply => reply.postId === postId)
}

var userDate = dayjs(users[users.length - 1].createdAt)
var date = userDate

for (const userId of range(2, 5)) {
  for (const post of posts) {
    for (const user of users) {
      if (Math.random() < 0.9) {
        posts[post.postId - 1].views++
        if (Math.random() < 0.5) {
          if (!hasAlreadyVotedPost(user.userId, post.postId)) {
            postVotes.push(postVoteFake(user.userId, post,
              date.add(timeSteps[1] + parseInt(Math.random() * randomtimeSteps[2], 10), 'ms')))

            if (postVotes[postVotes.length - 1].vote === 1) {
              posts[post.postId - 1].upvotes++
            } else {
              posts[post.postId - 1].downvotes++
            }
          }
        }
      }

      if (Math.random() < 0.2) {
        replies.push(repliesFake(user.userId, date, post.postId))
      }

      if (Math.random() < 0.1) {
        posts.push(postFake(user.userId, date))
      }

      for (const reply of allRepliesOfPost(post.postId)) {
        if (Math.random() < 0.7) {
          replies[reply.replyId - 1].views++
          if (Math.random() < 0.7) {
            if (!hasAlreadyVotedReply(user.userId, reply.replyId)) {
              replyVotes.push(replyVoteFake(user.userId, reply,
                date.add(timeSteps[1] + parseInt(Math.random() * randomtimeSteps[2], 10), 'ms')))

              if (replyVotes[replyVotes.length - 1].vote === 1) {
                replies[reply.replyId - 1].upvotes++
              } else {
                replies[reply.replyId - 1].downvotes++
              }
            }
          }
        }

        if (Math.random() < 0.4) {
          comments.push(commentFake(user.userId,
            date.add(timeSteps[1] + parseInt(Math.random() * randomtimeSteps[2], 10), 'ms'), reply))
        }
      }
    }
  }

  userDate = userDate.add(timeSteps[2] + parseInt(Math.random() * randomtimeSteps[2], 10), 'ms')
  date = userDate

  users.push(userFake(userId, userDate))
  for (const _ of range(0, randomIntFromInterval(minTagsPerUser, maxTagsPerUser))) {
    date = date.add(timeSteps[1] + parseInt(Math.random() * randomtimeSteps[0], 10), 'ms')
    tags.push(tagsFake(date, users[users.length - 1].userId))
  }
  for (const _ of range(0, randomIntFromInterval(0, maxPostPerUser))) {
    date = date.add(timeSteps[3] + parseInt(Math.random() * randomtimeSteps[2], 10), 'ms')
    posts.push(postFake(userId, date))
    for (const _ of range(0, randomIntFromInterval(0, maxCommentPerReply))) {
      date = date.add(timeSteps[0] + parseInt(Math.random() * randomtimeSteps[1], 10), 'ms')
      comments.push(commentFake(users[randomIntFromInterval(0, users.length - 1)].userId, date, posts[posts.length - 1]))
    }

    for (const _ of range(0, randomIntFromInterval(0, maxRepliesPerPost))) {
      date = date.add(timeSteps[3] + parseInt(Math.random() * randomtimeSteps[2], 10), 'ms')
      replies.push(repliesFake(users[randomIntFromInterval(0, users.length - 1)].userId, date, posts[posts.length - 1].postId))
      for (const _ of range(0, randomIntFromInterval(0, maxCommentPerReply))) {
        date = date.add(timeSteps[0] + parseInt(Math.random() * randomtimeSteps[1], 10), 'ms')
        comments.push(commentFake(users[randomIntFromInterval(0, users.length - 1)].userId, date, replies[replies.length - 1]))
      }
    }
  }
}
function logIfNotNull (err) {
  if (err) {
    console.log(err)
  }
}

fs.writeFile(path.join(PATH, 'users.json'), JSON.stringify(users), 'utf8', (err) => logIfNotNull(err))
fs.writeFile(path.join(PATH, 'posts.json'), JSON.stringify(posts), 'utf8', (err) => logIfNotNull(err))
fs.writeFile(path.join(PATH, 'replies.json'), JSON.stringify(replies), 'utf8', (err) => logIfNotNull(err))
fs.writeFile(path.join(PATH, 'tags.json'), JSON.stringify(replies), 'utf8', (err) => logIfNotNull(err))
fs.writeFile(path.join(PATH, 'comments.json'), JSON.stringify(comments), 'utf8', (err) => logIfNotNull(err))
fs.writeFile(path.join(PATH, 'postVotes.json'), JSON.stringify(postVotes), 'utf8', (err) => logIfNotNull(err))
fs.writeFile(path.join(PATH, 'replyVotes.json'), JSON.stringify(postVotes), 'utf8', (err) => logIfNotNull(err))
fs.writeFile(path.join(PATH, 'activities.json'), JSON.stringify(activities), 'utf8', (err) => logIfNotNull(err))
