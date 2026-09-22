import "../../../../css/merkit/home/capsule-css/mainCapsule.css"
import OneCapsule from "./OneCapsule"

const datas = [
  {
    "id": 1,
    "userId": 101,
    "username": "anshu",
    "profilepic": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    "name": "Anshu Kumar",
    "title": "A Message to My Future Self",
    "description": "I hope you are proud of how far you have come. Remember the dreams, struggles, and small moments that made this journey meaningful.",
    "latitude": 23.2599,
    "longitude": 77.4126,
    "views": 24,
    "likes": 8,
    "thumbnail": {
      "publicId": "sample",
      "url": "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    },
    "attachments": [
      {
        "publicId": "sample",
        "url": "https://res.cloudinary.com/demo/image/upload/sample.jpg"
      }
    ],
    "openDate": "2027-09-22T10:00:00",
    "createdAt": "2026-09-22T09:30:00",
    "updatedAt": "2026-09-22T09:30:00"
  },
  {
    "id": 2,
    "userId": 102,
    "username": "rahul_dev",
    "profilepic": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    "name": "Rahul Sharma",
    "title": "The Day I Become a Developer",
    "description": "Today I am learning, making mistakes, fixing bugs, and working toward my first developer job. I hope when I open this capsule, I can say that I never gave up.",
    "latitude": 17.3850,
    "longitude": 78.4867,
    "views": 51,
    "likes": 15,
    "thumbnail": {
      "publicId": "sample",
      "url": "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    },
    "attachments": [
      {
        "publicId": "sample",
        "url": "https://res.cloudinary.com/demo/image/upload/sample.jpg"
      }
    ],
    "openDate": "2027-03-22T18:30:00",
    "createdAt": "2026-09-22T10:15:00",
    "updatedAt": "2026-09-22T10:15:00"
  },
  {
    "id": 3,
    "userId": 103,
    "username": "priya_23",
    "profilepic": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    "name": "Priya Singh",
    "title": "Don't Forget This Day",
    "description": "Maybe the details of today will become blurry with time, but I want my future self to remember the people, conversations, laughter, and feelings that made this day special.",
    "latitude": 19.0760,
    "longitude": 72.8777,
    "views": 37,
    "likes": 12,
    "thumbnail": {
      "publicId": "sample",
      "url": "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    },
    "attachments": [
      {
        "publicId": "sample",
        "url": "https://res.cloudinary.com/demo/image/upload/sample.jpg"
      }
    ],
    "openDate": "2027-12-31T23:00:00",
    "createdAt": "2026-09-22T11:00:00",
    "updatedAt": "2026-09-22T11:00:00"
  },
  {
    "id": 4,
    "userId": 104,
    "username": "vikas_travels",
    "profilepic": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    "name": "Vikas Mehta",
    "title": "What Can Change in One Year?",
    "description": "I am making a promise to myself today: learn more, build more, stay consistent, and become better than I was yesterday. I want to see how much I change when this capsule finally opens.",
    "latitude": 28.6139,
    "longitude": 77.2090,
    "views": 68,
    "likes": 21,
    "thumbnail": {
      "publicId": "sample",
      "url": "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    },
    "attachments": [
      {
        "publicId": "sample",
        "url": "https://res.cloudinary.com/demo/image/upload/sample.jpg"
      }
    ],
    "openDate": "2027-09-22T09:00:00",
    "createdAt": "2026-09-22T12:00:00",
    "updatedAt": "2026-09-22T12:00:00"
  }
]

export default function AllCapsule(){
    return (
        <div className="allCapsule isFlex wd">
            {
                datas.map((one)=>(
                    <OneCapsule key={one.id} data={one}/>
                ))
            }
        </div>
    )
}