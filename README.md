# riding-low-interactive-video
Imagining what an interactive music video might be.

A rough first interation of an idea I had after a conversation with Sean about how fun it is to repitch/mess with the master track of a fresh song.
I thought why not publish like that, let listeners interact with the song like we do in the daw. let it be more alive.

The video was made with python and a computer vision library. 
It's doing canny edge detection on an iphone video of us; listening to the song while waiting for an uber.

Two sliders allow the user to control a realtime delay(complete with a filtered feedback loop and an osc on the delay time to create some chorusing) 
and repitch of the song and video in realtime. 
All the sound processing is happening in the browser using the web audio api. 
The stream is analysed and draws an oscilloscope that reacts to the changes over the embedded video too.

I havent spent much time on the the ui. 
Keen to design something that explains and labels things inuitively but still allows the user to be surprised. 

RidingLowWithMyGirl.mp3
Interactive Demo
by Sean Fe'ao
BFF Records

Writing: Sean Fe'ao
Production: Sean Fe'ao
Mix & Master: Harri Knight
Video & Processing: Harri Knight
Development: Harri Knight
