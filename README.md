# K-Recorder



## Description

K-Recorder is an application made for those who enjoy singing. Sharing their own records and having access to other's.



## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and search for my friend's songs, log in and sign in
- **sign up** - As a user I want to sign up on the web page so that I can add favorite songs to my list.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out  so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorite songs and delete them.
- **schedule a room **- As a user I can program a karaoke room with other users previously invited
- **edit user** - As a user I want to be able to edit my profile.
- **result** - As a user I want to see the list of karaoke songs filter by the name.
- **song listing** - As a user I want to see more details of the song list, be able to call them.
- **user's profiles** - As a user I want to see more details of the other user's profiles
- **Search-bar** - As a user I want to search for my favorite karaoke songs.
- **Record and upload** -  As a user I want to record myself and uploaded it on my profile



## Server Routes (Back-end):

| **Method** | **Route**                     | **Description**                                              | Request - Body                                           |
| ---------- | ----------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                           | First app show.                                              |                                                          |
| `GET`      | `/login`                      | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                      | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                     | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                     | Sends Sign Up info to the server and creates user in the DB. | { email, password }                                      |
| `GET`      | `/private/profile`            | Private route. Renders `profile` form view.                  |                                                          |
| `GET`      | `/private/profile-edit`       | Private route. Renders `edit-profile` form view.             |                                                          |
| `PUT`      | `/private/edit-profile`       | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/private/favorites`          | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites/`         | Private route. Adds a new favorite for the current user.     | { name, cuisine, city, }                                 |
| `PUT` | `/private/favorites/:songtId` | Private route. Deletes the existing favorite from the current user. ||
| `DELETE`   | `/private/songs/:songId` | Private route. Deletes the existing songs from the current user. ||
| `GET`      | `/search`                     | Renders `search-bar` view.                                   |                                                          |
| `GET` | `/search/details?text=something` | Render `song` view with the particular video.                |                                                          |


## 

User model

```
{
  name: {type: String},
  email: {type: String, required: true},
  password: {type: String, required: true},
  songs:{type: Array},
  profilepic: {type: String, dedault: ""},
  favouriteSongs: [{Type: Schema.Types.ObjectId, ref: "Song"}]

}
```

Songs

```
{
  artist: {type: String},
  userId: {Type: Schema.Types.ObjectId, ref: "User"},
  title: {type: String},
  song: {type: String}
}
```



## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)



## Links

### GitHub

The url to your repository and to your deployed project

[Repository Link](https://gist.github.com/ross-u/8f91ec13aeaf35a1ba7603848284703f)

[Deploy Link](https://gist.github.com/ross-u/8f91ec13aeaf35a1ba7603848284703f)



### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)