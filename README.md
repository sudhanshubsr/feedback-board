<div align="center">
  <h1 align="center">Voxboard</h1>
    <h3>Feedback Board as a SaaS</h3>
</div>


<div align="center">
  <a href="https://voxboard.sudhanshu.site">Voxboard.com</a>
</div>

<div align="center">
    <img src="./public/voxBoardCanvas.png">
</div>

<br/>
<br/>

# VoxBoard - Feedback Board as a SaaS

VoxBoard is a feedback board SaaS solution, providing a platform for secure collaboration, feedback, and communication. Users can create password-protected and invite-only boards, receive notifications, and more.

## Features

- **Password Protected Boards:** Ensure secure access to your feedback boards with password protection.
- **Invite-Only Boards:** Restrict board access to invited users for controlled collaboration.
- **Real-time Notifications:** Stay informed with instant notifications on board activities.
- **Commenting and Replies:** Foster communication with the ability to leave comments and replies on feedback.
- **Multi-board Management:** Easily manage multiple feedback boards from a centralized dashboard.
- **Customizable Board Themes:** Personalize your boards with customizable themes to match your branding.
- **Sorting Facility:** Organize feedback items based on various criteria for better visibility.
- **Search Facility:** Quickly find specific feedback using a powerful search functionality.
- **Suggestion Box:** Allow users to submit suggestions anonymously for open and honest feedback.
- **Archive Boards:** Archive boards to declutter your dashboard while preserving data for future reference.

## Tech Stack

- [Next.js](https://nextjs.org/) – Frontend framework
- JavaScript – Programming language
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [Prisma](https://prisma.io) - ORM (Object-Relational Mapping)
- [Vercel](https://vercel.com/) – Hosting platform
- [NextAuth.js](https://next-auth.js.org/) – Authentication
- [Resend](https://resend.com) – Email service
- [MongoDB](https://www.mongodb.com/) – Database
- [Amazon S3](https://aws.amazon.com/s3/) – Cloud storage
- [Stripe](https://stripe.com) – Payment processing
- [GitHub](https://github.com) – Version control
- [Google](https://www.google.com) – OAuth
- [HTML](https://html.com) – Markup language


- [Add more technologies as needed]

## Demo 
![VoxBoard Demo](./public/voxboardDemo.gif)


## Getting Started

### 1. Clone the repository

```shell
git clone https://github.com/sudhanshubsr/feedbac-board
cd feebac-board
```

### 2. Install npm dependencies

```shell
yarn install
```

### 3. Copy the environment variables to `.env`

```shell
cp .env.example .env
```

### 4. Configure the variables in `.env`

| Variable                 | Value                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------|
| NEXTAUTH_SECRET          | "example_nextauth_secret"                                                                   |
| NEXTAUTH_URL             | "http://localhost:3000"                                                                     |
| GITHUB_CLIENT_ID         | "example_github_client_id"                                                                  |
| GITHUB_CLIENT_SECRET     | "example_github_client_secret"                                                              |
| GOOGLE_CLIENT_ID         | "example_google_client_id"                                                                  |
| GOOGLE_CLIENT_SECRET     | "example_google_client_secret"                                                              |
| EMAIL_SERVER_USER        | "example_email_user"                                                                        |
| EMAIL_SERVER_PASSWORD    | "example_email_password"                                                                    |
| EMAIL_SERVER_HOST        | "example_email_host"                                                                        |
| EMAIL_SERVER_PORT        | 465                                                                                         |
| EMAIL_FROM               | "support@example.com"                                                                       |
| RESEND_API_KEY           | "example_resend_api_key"                                                                    |
| MONGO_URL                | "mongodb+srv://username:password@cluster0.mongodb.net/database?retryWrites=true&w=majority" |
| S3_ACCESS_KEY            | "example_s3_access_key"                                                                     |
| S3_SECRET_ACCESS_KEY     | "example_s3_secret_access_key"                                                              |
| S3_BUCKET_NAME           | "example_s3_bucket_name"                                                                    |
| STRIPE_SECRET_KEY        | "example_stripe_secret_key"                                                                 |
| STRIPE_PUBLIC_KEY        | "example_stripe_public_key"                                                                 |
| STRIPE_WEBHOOK_SECRET    | "example_stripe_webhook_secret"                                                             |
                




### 5. Initialize the database

```shell
npx prisma generate
```

### 6. Run the dev server

```shell
npm run dev
```

### 7. Open the app in your browser

Visit [http://localhost:3000](http://localhost:3000) in your browser.


## Deploy your own

All you need is a Vercel account and access to Vercel Storage (_Blob_ and _Postgres_). Click the
button below to clone and deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mfts/papermark&env=NEXTAUTH_SECRET,NEXTAUTH_URL,POSTGRES_PRISMA_URL,POSTGRES_PRISMA_URL_NON_POOLING,BLOB_READ_WRITE_TOKEN,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,NEXT_PUBLIC_BASE_URL&envDescription=Here%27s%20an%20example%20.env%20for%20all%20variables%20required&envLink=https://github.com/mfts/papermark/blob/main/.env.example&project-name=my-awesome-papermark&repository-name=my-awesome-papermark&demo-title=Papermark&demo-description=Papermark%20is%20an%20open-source%20document%20sharing%20alternative%20to%20DocSend%20with%20built-in%20analytics.&demo-url=https://www.papermark.io&demo-image=https://www.papermark.io/_static/papermark.png)


## Open Source

Voxboard is an open-source project, and you are welcome to use, modify, and distribute the code. However, it does not come with a specific license.

Feel free to contribute, share, or build upon this project. We appreciate any contributions from the community.

If you have questions or suggestions, please open an issue or reach out to us.

Happy coding!
