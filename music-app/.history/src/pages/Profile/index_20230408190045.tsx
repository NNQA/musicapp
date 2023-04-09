import React, { useEffect, useRef, useState } from 'react'
import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from 'next'
import Userimg from "../../static/user.png"
import Image from 'next/image';
import userCurrent from '@/hook/currentuser';
import { data } from '@/components/elements/Form/data';
import Modaledit from '@/components/elements/Form/Modaledit';
import { AiFillPlayCircle, AiFillPauseCircle, AiOutlineHeart } from "react-icons/ai"
import audio from "../../../public/aa.mp3"
import WaveSurfer from "wavesurfer.js";


import { WaveSurferParams } from 'wavesurfer.js/types/params';


// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props: {}
//   }
// }

const waveformOptions: WaveSurferParams = {
  container: '#waveform',
  waveColor: 'violet',
  progressColor: 'purple',
  cursorColor: 'navy'
};
function index() {
  // const { data: user } = userCurrent();

  const session = useSession();
  const [action, setAction] = useState(false);
  const [actionModal, setActionModal] = useState(true);
  const [wavesurfer, setWaveSurfer] = useState(null);
  const waveformRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (waveformRef.current && audioRef.current) {
      const globalAny: any = global;
      const ws = WaveSurfer.create({
        ...waveformOptions,
        container: waveformRef.current,
        audioContext: globalAny?.AudioContext ?? globalAny?.webkitAudioContext
      });

      ws.load(audioRef.current);
      setWaveSurfer(ws);

      return () => {
        ws.destroy();
      };
    }
  }, [waveformRef, audioRef]);

  const handlePlayPause = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  return (
    <div>
      <Head>
        <title>WaveSurfer Next.js Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>WaveSurfer Next.js Example</h1>

        <div id="waveform" ref={waveformRef}></div>

        <audio src="/example.mp3" ref={audioRef}></audio>

        <button onClick={handlePlayPause}>Play / Pause</button>
      </main>
    </div>
  );
}
In this implementation, we're checking for the AudioContext object on the global object instead of self. We're also using the global object to store the value of AudioContext instead of window.

I hope this helps!




carottone@mail1s.cyou
 ReferenceError: self is not defined
    at Object.<anonymous> wavesurfer.js/dist/wavesurfer.js
The error message "ReferenceError: self is not defined" can occur when you're trying to use self or window in a Node.js environment, where they are not defined.

It's possible that this error is occurring because the wavesurfer.js library expects the self variable to be defined as the global self or window object, but it is not defined in the current environment.

One possible solution is to use a package like jsdom to simulate a browser environment with a global self object. Here's an example of how you can modify your code to use jsdom:

tsx
Copy code
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import WaveSurfer from 'wavesurfer.js';
import type { WaveSurferParams } from 'wavesurfer.js';
import { JSDOM } from 'jsdom';

const waveformOptions: WaveSurferParams = {
  container: '#waveform',
  waveColor: 'violet',
  progressColor: 'purple',
  cursorColor: 'navy'
};

// Create a fake DOM environment with a global "self" object
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).self = window;

export default function Home() {
  const [wavesurfer, setWaveSurfer] = useState(null);
  const waveformRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (waveformRef.current && audioRef.current) {
      const ws = WaveSurfer.create({
        ...waveformOptions,
        container: waveformRef.current,
        audioContext: window?.AudioContext ?? window?.webkitAudioContext
      });

      ws.load(audioRef.current);
      setWaveSurfer(ws);

      return () => {
        ws.destroy();
      };
    }
  }, [waveformRef, audioRef]);

  const handlePlayPause = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  return (
    <div>
      <Head>
        <title>WaveSurfer Next.js Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>WaveSurfer Next.js Example</h1>

        <div id="waveform" ref={waveformRef}></div>

        <audio src="/example.mp3" ref={audioRef}></audio>

        <button onClick={handlePlayPause}>Play / Pause</button>
      </main>
    </div>
  );
}
In this implementation, we're using the JSDOM package to create a fake DOM environment with a global self object. We're also using the window object to store the value of AudioContext instead of self.

I hope this helps!




carottone@mail1s.cyou
node_modules/wavesurfer.js/dist/wavesurfer.js  wrong
It's possible that the issue you're facing is related to how you're importing the wavesurfer.js library in your project. Here are some things you can try:

Make sure that you're importing the correct version of wavesurfer.js that matches your project's setup. For example, if you're using TypeScript, you'll need to import the TypeScript definitions for wavesurfer.js as well.

Check that you're importing the library correctly. Here's an example of how to import the library in a Next.js project:

tsx
Copy code
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import WaveSurfer from 'wavesurfer.js';
import type { WaveSurferParams } from 'wavesurfer.js';

const waveformOptions: WaveSurferParams = {
  container: '#waveform',
  waveColor: 'violet',
  progressColor: 'purple',
  cursorColor: 'navy'
};

export default function Home() {
  const [wavesurfer, setWaveSurfer] = useState(null);
  const waveformRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (waveformRef.current && audioRef.current) {
      const ws = WaveSurfer.create({
        ...waveformOptions,
        container: waveformRef.current
      });

      ws.load(audioRef.current);
      setWaveSurfer(ws);

      return () => {
        ws.destroy();
      };
    }
  }, [waveformRef, audioRef]);

  const handlePlayPause = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  return (
    <div>
      <Head>
        <title>WaveSurfer Next.js Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>WaveSurfer Next.js Example</h1>

        <div id="waveform" ref={waveformRef}></div>

        <audio src="/example.mp3" ref={audioRef}></audio>

        <button onClick={handlePlayPause}>Play / Pause</button>
      </main>
    </div>
  );
}
In this implementation, we're importing the WaveSurfer class from wavesurfer.js, as well as the WaveSurferParams type. We're also defining the waveformOptions object, which we'll pass to the WaveSurfer.create method.

If the issue persists, it's possible that there's a problem with your wavesurfer.js installation or with your Node.js environment. You may want to try reinstalling the library or updating your Node.js version to see if that resolves the issue.
I hope this helps!




carottone@mail1s.cyou
how to check correct version of wavesurfer.js in nextjs
To check the version of the wavesurfer.js library installed in your Next.js project, you can run the following command in your project directory:

Copy code
npm list wavesurfer.js
This will display the version of wavesurfer.js installed, as well as the version of any of its dependencies. You can also use the npm outdated command to check for outdated packages in your project, including wavesurfer.js.

If you need to install a specific version of wavesurfer.js, you can do so by running the following command:

kotlin
Copy code
npm install wavesurfer.js@<version>
Replace <version> with the version number you want to install. For example, to install version 5.3.0 of wavesurfer.js, you would run:

css
Copy code
npm install wavesurfer.js@5.3.0
I hope this helps!




carottone@mail1s.cyou
Call Stack Object.<anonymous>
 wavesurfer.js/dist/wavesurfer.js
The error message "Call Stack Object.<anonymous> wavesurfer.js/dist/wavesurfer.js" indicates that there's an issue with the wavesurfer.js library itself.

Here are some things you can try:

Make sure that you're importing the correct version of wavesurfer.js that matches your project's setup. For example, if you're using TypeScript, you'll need to import the TypeScript definitions for wavesurfer.js as well.

Check that you're importing the library correctly. Here's an example of how to import the library in a Next.js project:

tsx
Copy code
import WaveSurfer from 'wavesurfer.js';
Make sure that the path to the library is correct and that you're not accidentally importing an empty object.

If the issue persists, it's possible that there's a problem with your wavesurfer.js installation or with your Node.js environment. You may want to try reinstalling the library or updating your Node.js version to see if that resolves the issue.

It's also possible that there's a problem with the audio file you're trying to load with wavesurfer.js. Make sure that the file exists and is in a format that wavesurfer.js supports (such as MP3, WAV, or OGG).

If none of these solutions work, you may want to check the wavesurfer.js documentation or open an issue on the wavesurfer.js GitHub repository for further assistance.




carottone@mail1s.cyou
uninstall wavesurfer.js nextjs
To uninstall wavesurfer.js from your Next.js project, you can use the following command in your project directory:

Copy code
npm uninstall wavesurfer.js
This will remove the wavesurfer.js library from your project, along with any of its dependencies that are no longer needed.

After running this command, make sure to remove any import statements for wavesurfer.js in your code. You may also want to delete any remaining files or folders associated with the library, such as its TypeScript definitions or its source files.

I hope this helps!




carottone@mail1s.cyou
if libary wavesurfer still wrong, What different other way to custom file audio nextjs
If you're having trouble with the wavesurfer.js library and need an alternative way to customize audio files in your Next.js project, there are a few options you can consider:

Use the HTML5 audio element: The HTML5 audio element allows you to embed audio files in your web pages and customize their playback using JavaScript. You can use the Audio object in JavaScript to create an audio object, set its source, and control its playback. Here's an example of how to create an audio element in HTML and control its playback with JavaScript:
html
Copy code
<audio id="my-audio" src="/my-audio-file.mp3"></audio>
javascript
Copy code
const audioElement = document.getElementById('my-audio');

audioElement.play(); // Start playing the audio
audioElement.pause(); // Pause the audio
Use a different audio library: There are several other audio libraries available that you can use in your Next.js project, such as Howler.js, Tone.js, and Sound.js. These libraries offer similar functionality to wavesurfer.js, including waveform visualization, playback control, and audio effects. You can explore these libraries and choose one that meets your needs.

Use a server-side solution: If you need more control over the audio files in your Next.js project, you can consider using a server-side solution such as FFmpeg or SoX. These are powerful audio processing tools that allow you to convert audio formats, apply effects, and manipulate audio files programmatically. You can use these tools in combination with a server-side language such as Node.js to create custom audio files for your web pages.

I hope this helps!




carottone@mail1s.cyou
nextjs ffmpeg audio
Next.js is a server-side framework for React, which means that you can use server-side technologies like Node.js and its libraries, such as ffmpeg, to process audio files.

Here's an example of how you can use ffmpeg in a Next.js project to convert an audio file to a different format:

Install ffmpeg using the following command in your Next.js project directory:
arduino
Copy code
npm install ffmpeg-static
Create a server-side endpoint that accepts an audio file and converts it to a different format using ffmpeg. Here's an example of how you can use express (which is included with Next.js) to create a server-side endpoint that accepts a file upload, converts the file to MP3 format, and sends the converted file back to the client:
js
Copy code
import express from 'express';
import fileUpload from 'express-fileupload';
import ffmpeg from 'ffmpeg-static';

const app = express();

// Enable file uploads
app.use(fileUpload());

// Create a server-side endpoint that accepts an audio file and converts it to MP3 format
app.post('/convert', async (req, res) => {
  try {
    // Get the uploaded file from the request
    const audioFile = req.files.audio;

    // Convert the audio file to MP3 format using ffmpeg
    const ffmpegProcess = new ffmpeg(audioFile.data);
    await ffmpegProcess.fnExtractSoundToMP3('/tmp/output.mp3');

    // Send the converted file back to the client
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', `attachment; filename=${audioFile.name}.mp3`);
    res.send(ffmpegProcess.mp3buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while converting the audio file.');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000.');
});
Create a client-side form that allows the user to upload an audio file and submit it to the server. Here's an example of how you can use the fetch API to send a file to the server:
jsx
Copy code
import { useState } from 'react';

export default function AudioConverter() {
  const [audioFile, setAudioFile] = useState(null);

  const handleFileUpload = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('audio', audioFile);

      const response = await fetch('/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('An error occurred while converting the audio file.');
      }

      const blob = await response.blob();

      // Do something with the converted file, such as playing it in an audio element
      const audioElement = new Audio(URL.createObjectURL(blob));
      audioElement.play();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" accept="audio/*" onChange={handleFileUpload} />
      <button type="submit">Convert to MP3</button>
    </form>
  );
}
This example shows how you can use ffmpeg to convert an audio file to a different format in a Next.js project. You can modify this code to suit your specific needs, such as adding audio effects or processing multiple files at once.




carottone@mail1s.cyou
custom audio nextjs css
You can use CSS to customize the appearance of audio elements in your Next.js project. Here's an example of how you can style an audio element using CSS:

jsx
Copy code
import styles from './audio.module.css';

export default function AudioPlayer({ src }) {
  return (
    <audio src={src} controls className={styles.audioPlayer}>
      Your browser does not support the audio element.
    </audio>
  );
}
In this example, we're using a CSS module (audio.module.css) to style the audio element. Here's an example of how you can define styles in the CSS module:

css
Copy code
/* audio.module.css */

.audioPlayer {
  width: 100%;
  height: 50px;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
}

.audioPlayer::-webkit-media-controls-panel {
  background-color: transparent;
  color: #333;
}

.audioPlayer::-webkit-media-controls-play-button {
  background-image: url('/play-icon.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 30px;
  height: 30px;
}

.audioPlayer::-webkit-media-controls-volume-slider-container {
  display: none;
}
In this example, we're using CSS selectors to target different parts of the audio element and apply custom styles. For example, we're using the ::-webkit-media-controls-panel selector to customize the appearance of the media controls panel, and the ::-webkit-media-controls-play-button selector to replace the default play button with a custom icon.

You can modify these styles to suit your specific needs, such as changing the background color, adjusting the size of the audio element, or adding custom icons.







  return (
    <div className='px-20 pb-5'>
      <div className='bg-slate-200 pb-1'>
        <div className='flex relative items-center p-10 bg-gray-500 text-white'>
          <Image
            src={Userimg}
            alt="Image User"
            className='h-50 w-25 absolute rounded-md -bottom-4 bg-slate-50 p-2 shadow-md'>

          </Image>
          <div className='ml-[150px] mt-12'>
            <p className='text-2xl'>
              {/* Name: {session.data?.user?.name} */}
            </p>
            <p className='text-xl opacity-70'>
              {/* Email: {user?.email} */}
            </p>
          </div>
        </div>
        <div className='flex flex-row justify-between mr-10'>
          <Modaledit actionModal={actionModal} setActionModal={setActionModal}
          ></Modaledit>
          <div className='space-x-5 mt-8'>
            <button className='border-2 bg-[#f50] p-2 rounded-lg text-white'>Your Insights</button>
            <button className='border-2 bg-white p-2 rounded-lg'>Share</button>
            <button className='border-2 bg-white p-2 rounded-lg'>Station</button>
          </div>

        </div>
      </div>
      <div className=''>
        <div className='px-8 py-2 border-2 w-full'>
          <h3 className='text-2xl'>Track</h3>
        </div>

      </div>



      <div className='px-6 border-2 py-3 cursor-pointer w-full'>
        <div className='flex'>
          <div>
            <Image
              src={Userimg}
              alt="Image Item"
              className='w-[75px] h-[75px]'>
            </Image>
          </div>
          <div className='w-full'>
            <div className=''>
              <div className='p-2'>
                <div>
                  <p>tile Song Name</p>
                </div>
              </div>
              <div className='p-2 flex space-x-5' onClick={() => setAction(!action)}>
                {actionModal ?
                  <audio controls className='w-2/3 h-[24px]'
                    src={audio}>

                  </audio>
                  : ''}
                <div className='border-2 w-fit flex items-center px-2 space-x-4'>

                  <AiOutlineHeart></AiOutlineHeart>
                  <p className='text-sm'>100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default index