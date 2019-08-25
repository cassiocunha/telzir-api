db.auth('root', 'example')

db.createUser({
  user: 'telzir-api-user',
  pwd: 'telzir-api-user',
  roles: [
    {
      role: 'readWrite',
      db: 'telzirapi',
    },
  ],
});

db = db.getSiblingDB('telzirapi')

db.customers.insert(
  {
      _id: ObjectId("5d5b3cf68f85330ff6b6147c"),
      name: "Cassio Rocha",
      email: "cassio1706@gmail.com",
      password: "$2a$10$oWc.b36eNOwJz3mVq7UpUemRDoG1o9r3f2h4KSe.y1k0YVOBGo4O.",
      __v: 0
  }
)

db.fares.insert([
  {
      _id: ObjectId("5d5c3ba7aa284f532b9ec872"),
      originCode: "011",
      destinationCode: "016",
      minutePrice: 1.9,
      active: true,
      __v: 0
  },
  {
      _id: ObjectId("5d5c3bfdaa284f532b9ec873"),
      originCode: "016",
      destinationCode: "011",
      minutePrice: 2.9,
      active: true,
      __v: 0
  },
  {
      _id: ObjectId("5d5c3cfdaa284f532b9ec874"),
      originCode: "011",
      destinationCode: "017",
      minutePrice: 1.7,
      active: true,
      __v: 0
  },
  {
      _id: ObjectId("5d5c3d13aa284f532b9ec875"),
      originCode: "017",
      destinationCode: "011",
      minutePrice: 2.7,
      active: true,
      __v: 0
  },
  {
      _id: ObjectId("5d5c3d37aa284f532b9ec876"),
      originCode: "011",
      destinationCode: "018",
      minutePrice: 0.9,
      active: true,
      __v: 0
  },
  {
      _id: ObjectId("5d5c3d5caa284f532b9ec877"),
      originCode: "018",
      destinationCode: "011",
      minutePrice: 1.9,
      active: true,
      __v: 0
  }
])

db.plans.insert([
  {
      _id: ObjectId("5d5c834dc6f2917708ed2d90"),
      name: "FaleMais 30",
      price: 50,
      freeMinutes: 30,
      exceededMinutePercent: 0.1,
      createDate: ISODate("2019-08-20T23:33:33.460Z"),
      active: true,
      slug: "fale-mais-30",
      __v: 0
  },
  {
      _id: ObjectId("5d5c837bc6f2917708ed2d91"),
      name: "FaleMais 60",
      price: 70,
      freeMinutes: 60,
      exceededMinutePercent: 0.1,
      createDate: ISODate("2019-08-20T23:34:19.470Z"),
      active: true,
      slug: "fale-mais-60",
      __v: 0
  },
  {
      _id: ObjectId("5d5c8392c6f2917708ed2d92"),
      name: "FaleMais 120",
      price: 100,
      freeMinutes: 120,
      exceededMinutePercent: 0.1,
      createDate: ISODate("2019-08-20T23:34:42.617Z"),
      active: true,
      slug: "fale-mais-120",
      __v: 0
  }
])

db.products.insert([
  {
      _id: ObjectId("5d5c93631938747e5062a497"),
      plans: [
          ObjectId("5d5c834dc6f2917708ed2d90"),
          ObjectId("5d5c837bc6f2917708ed2d91"),
          ObjectId("5d5c8392c6f2917708ed2d92")
      ],
      name: "FaleMais",
      slug: "fale-mais",
      createDate: ISODate("2019-08-21T00:42:11.523Z"),
      active: true,
      __v: 0
  }
])