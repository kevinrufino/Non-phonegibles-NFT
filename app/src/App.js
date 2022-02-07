import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';
import banner from './assets/Website_Banner.png'

// Constants
const TWITTER_HANDLE = 'nonphonegibles';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions

  /*
  * Declare your function
  */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          /*
         * The solana object gives us a function that will allow us to connect
         * directly with the user's wallet!
         */
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );
        /*
           * Set the user's publicKey in state to be used later!
           */
        setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

   /*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
   const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
   };

   /*
    * We want to render this UI when the user hasn't connected
    * their wallet to our app yet.
    */
   const renderNotConnectedContainer = () => (
     <button
       className="cta-button connect-wallet-button"
       onClick={connectWallet}
     >
       Connect to Wallet
     </button>
   );

  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className='logo'></p>
          <img className='logo' src={banner} alt="Logo" />
          <p className="header">World of NPTs</p>
          <div className='sub-text-box'>
            <p className="sub-text">In the year 2021 a huge EMP accidentally blew up in the power grid, destroying all of technology as we know it. Humans rebuilt as quickly as possible but their efforts were in vain as the heads of centralized power were more interested in their own well-being rather than focus on humanity as a whole.</p>
            <p></p>
            <p className="sub-text">In reaction to this, a group of stoned engineers decided to create a sentient form of decentralized goverenance to fix the grid and the Non-Phonegibles were formed! A collection of 4444 supernatural phones that act as the computing powers of all of earth. These phones serve extremely useful powers to it's owners and users as they have early access to the sweet sweet world web 3.</p>
            <p></p>
            <p className="sub-text">By buying a NPT you are allowing the team to donate real phones to people in poor underpriveldged areas.</p>
            <p></p>
          </div>
          <p className='header'>Road Map:</p>
          <div className='sub-text-box'>
            <p className='sub-text'>25% Sold: Donate 500 Phones</p>
            <p></p>
            <p className='sub-text'>50% Sold: Donate 1000 Phones</p>
            <p></p>
            <p className='sub-text'>75% Sold: Donate 1500 Phones</p>
            <p></p>
            <p className='sub-text'>100% Sold: Donate 2000 Phones</p>
            <p></p>
          </div>
          {!walletAddress && renderNotConnectedContainer()}
        {/* </div> */}
          {/* Check for walletAddress and then pass in walletAddress */}
          {walletAddress && <CandyMachine walletAddress={window.solana} />}

        </div>

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`Follow us @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
