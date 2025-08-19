import React from 'react';

const Newsletter = () => {
  return (
    <div className="newsletter">
      <h3>Signals from Ulix</h3>
      <p>
        New apps, new updates, and the occasional interesting idea—for those who believe tools should serve.
      </p>
      <iframe
        scrolling="no"
        src="https://buttondown.com/ulix?as_embed=true&theme=1677be"
        title="Newsletter signup"
      ></iframe>
    </div>
  );
};

export default Newsletter;