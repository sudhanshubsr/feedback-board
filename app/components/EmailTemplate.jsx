import React from 'react';
const WelcomeEmail = ({email,company}) => {

  const baseUrl = process.env.URL? `https://${process.env.URL}`
    : '';

  const previewText = `Welcome to ${company}, ${email}!`;

  return (
    <div>
      <div>
        {/* Head and Preview components */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome Email</title>
        <meta name="description" content={previewText} />

        <div>{previewText}</div>
      </div>

      <div>
        <div className="bg-white my-auto mx-auto font-sans">
          <div className="my-10 mx-auto p-5 w-[465px]">
            <div className="mt-8">
              <img
                src={`https://imagesprojects.s3.ap-south-1.amazonaws.com/voxboard/VoxboardNewLogo.png`}
                width="120"
                height="80"
                alt="Logo"
              />
            </div>
            <h2 className="text-2xl font-normal text-center p-0 my-8 mx-0">
              Welcome to <strong>{company}</strong>, {email}!
            </h2>
            <p className="text-sm">
              Hello {email},
            </p>
            <p className="text-sm">
              We're excited to have you onboard at <strong>{company}</strong>. We hope you enjoy your journey with us. If you have any questions or need assistance, feel free to reach out.
            </p>

            {/* Section */}
            <div className="text-center mt-[32px] mb-[32px]">
              {/* Button */}
              <a
                className="bg-[#00A3FF] rounded text-white text-xs font-semibold no-underline text-center px-20 py-12"
                href={`https://voxboard.sudhanshu.site/login`}
              >
                Get Started
              </a>
            </div>

            {/* Text */}
            <p className="text-sm">
              Cheers,
              <br/>
              The {company} Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeEmail;
