<div id="top"></div>

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/slipiduche/quizsurvey">
    <img src="https://48tools.com/wp-content/uploads/2015/09/shortlink.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Work@ Membrane Challenge</h3>

  <p align="center">
    
a web app with a quiz form that rewards users with tokens for participating in the survey
    <br />
    <a href="https://github.com/slipiduche/quizsurvey"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://quizsurvey.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/slipiduche/quizsurvey/issues">Report Bug</a>
    ·
    <a href="https://github.com/slipiduche/quizsurvey/issues">Request Feature</a>

  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
                <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](http://quizsurvey.vercel.app/)

<br />
    <a href="https://github.com/slipiduche/quizsurvey/tree/main/images"><strong>More Images »</strong></a>
    <br />

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [Ant design](https://ant.design/)
- [Mobx](https://mobx-state-tree.js.org/)
- [Metamask](https://metamask.io/)
- [ether.js](https://ethers.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Installation

To deploy an test locally:

1. Clone the repo
   ```sh
   git clone https://github.com/slipiduche/quizsurvey.git
   ```
2. Install all packages

   ```sh
   npm install
   # or
   yarn install

   ```

3. Run the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

To take surveys you will need [metamask](https://metamask.io) wallet installed in your web browser.

The web should behave as follows:

- Connect Metamask wallet
- Ensure user is connected to ropsten, if not show a button to switch networks automatically.
- Show balance of $QUIZ token (address below).
- Once the page is loaded, present the title of the daily trivia with its picture and a button
  that allows you to begin answering.
- Once the survey starts, display the current question, which will be available for the amount
  of seconds in the lifetimeSeconds property.
- Answered or not it should move onto the next question.
- Once all the questions are finished, show an overview with all the answers.
- Show a button to submit the questions to the validator contract
- Refresh the balance of $QUIZ

If all gone well you wil see your QUIZ tokens in your wallet after a few minutes

[![Metamask Balance][metamask-balance-screenshot]]

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Alejandro Camacaro - [@guajee](https://twitter.com/guajee) - alejandrocamacaro91@gmail.com

Project Link: [https://github.com/slipiduche/quizsurvey](https://github.com/slipiduche/quizsurvey)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/slipiduche/quizsurvey.svg?style=for-the-badge
[contributors-url]: https://github.com/slipiduche/quizsurvey/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/slipiduche/quizsurvey.svg?style=for-the-badge
[forks-url]: https://github.com/slipiduche/quizsurvey/network/members
[stars-shield]: https://img.shields.io/github/stars/slipiduche/quizsurvey.svg?style=for-the-badge
[stars-url]: https://github.com/slipiduche/quizsurvey/stargazers
[issues-shield]: https://img.shields.io/github/issues/slipiduche/quizsurvey.svg?style=for-the-badge
[issues-url]: https://github.com/slipiduche/quizsurvey/issues
[license-shield]: https://img.shields.io/github/license/slipiduche/quizsurvey.svg?style=for-the-badge
[license-url]: https://github.com/slipiduche/quizsurvey/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/alejandro-camacaro-9ba1b558
[product-screenshot]: images/profile.png
[metamask-balance-screenshot]: images/metamask-balance-screenshot.png
