# AlgoArena

AlgoArena is a platform for competitive programming. It allows users to linked to their online judges accounts and keep track of their progress in solving problems.

[Business Requirements](https://github.com/Daniel777y/AlgoArena/blob/main/AlgoArenaBR.md)

[Introduction Video]()

## Features

Currently AlgoArena (Demo phase) supports the following features:

* Linked to online judges accounts.
* Keep track of your ratings.
* Rank all users based on their avrage ratings.
* Check out upcoming contest.

## Getting Started

### Demo

[AlgoArena Demo]()

### Run on your machine

```bash
git clone git@github.com:Daniel777y/AlgoArena.git
cd AlgoArena
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to play around with the app.

## Usage

This project is still in development phase, so it doesn't really support user system yet. To use it, you can go to the settings page, type your email and "Login". It lists all the users in the system, you can choose one to login as.

Then you can link to your online judges accounts. Currently, we support Codeforces and LeetCode. I will add more online judges and require verification in the future.

You can link multiple accounts to the same user. The system will calculate your average rating based on all linked accounts.

In the home page, you can see your ratings of all linked accounts and check the upcoming contests.

In the ranking page, you can see all users' average ratings and rank them.

## Todo

- [ ] Add user system.
- [ ] Support more online judges.
- [ ] Require verification when linking accounts.
- [ ] Add more statistics and analysis options.
- [ ] Add recommendation system.
- [ ] Add problem system.

## Contributing

Welcome contributions to AlgoArena! If you have suggestions for improvements or bug fixes, please open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch (git checkout -b feature/YourAmazingFeature).
3. Commit your changes (git commit -m 'Your amazing feature').
4. Push to the branch (git push origin feature/YourAmazingFeature).
5. Open a pull request.

## License

This project is licensed under the [MIT License](https://github.com/Daniel777y/AlgoArena/blob/main/LICENSE).
