---
layout: page
title: Twitch Stream Archive + Info
---

Hey! I stream over at <a href="https://twitch.tv/physbuzz">twitch.tv/physbuzz</a>. Here's a page with all of my uploaded work.

## Twitch Stream Recordings and Files


<ul id="twitch-ul">
</ul>

<!-- <li><span class="nks-li">08/11/2024.</span> <a href="">Recording</a>. Notebook: (<a href="">download</a>, <a href="">pdf</a>, <a href="">web</a></li>-->

<!-- <li><span class="twitch-li">07-27-2024</span>. <a href="link">Recording</a>. Notebook: (<a href="link">download</a>, <a href="link">pdf</a>, <a href="link">web</a>)</li> -->
<script>

const links=[
{"date":"07-27-2024",
    "media-dir":"media/07-27-2024", "show-media":false,
    "recording":"https://youtu.be/6ZRgKVg8wY4",
    "notebook-dl":"streaming-07-27-2024.nb",    
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/streaming-07-27-2024.nb", 
    "notebook-pdf":"streaming-07-27-2024.pdf",
    "topics":"Trying to create fast + good looking line integral convolution plots of fluid flows (just Stokes flow)."
},
{"date":"07-29-2024",
    "media-dir":"media/07-29-2024",
    "recording":"https://youtu.be/Nzsh5LmObt4",
    "notebook-dl":""
    ,"notebook-web":"",
    "notebook-pdf":"",
    "topics":"Continuation of the previous day (same notebook as two days ago). There are some more files in the media directory though. Also check out <a href=\"media/07-29-2024/wigglysphere.gif\">wigglysphere.gif</a>!"
},
{"date":"08-02-2024",
    "media-dir":"media/08-02-2024","show-media":false,
    "recording":"https://youtu.be/PqeAs1aH8Eo",
    "notebook-dl":"streaming-08-02-2024.nb",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/streaming-08-02-2024.nb",
    "notebook-pdf":"streaming-08-02-2024.pdf",
    "topics":"Did some basic code to timestep particles along flow lines, and talked a bit about 2D electrostatics."
},
{"date":"08-03-2024",
    "media-dir":"media/08-03-2024",
    "recording":"https://youtu.be/ML6-FYUKsq4",
    "notebook-dl":"streaming-08-03-24.nb",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/streaming-08-03-24.nb",
    "notebook-pdf":"streaming-08-03-24.pdf",
    "topics":["Started out by implementing a branch and bound algorithm to solve the knapsack problem.","Ended out with a nice animation of a pendulum because why not?"]
},
{"date":"08-30-2024",
    "media-dir":"media/08-30-2024",
    "recording":"https://youtu.be/3cE_Cyq_8Vs",
    "notebook-dl":"streaming-08-30-2024.nb",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/streaming-08-30-2024.nb",
    "notebook-pdf":"streaming-08-30-2024.pdf",
    "topics":["Completely derailed and started writing a Poisson's equation solver; I got some OK code but I'm way too rusty on this!"]
},
{"date":"10-23-2024",
    "media-dir":"media/10-23-2024", "show-media":true,
    "recording":"https://youtu.be/Gg6y8kGEfC8",
    "notebook-dl":"streaming-10-23-2024.nb",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/streaming-10-23-2024.nb",
    "notebook-pdf":"streaming-10-23-2024.pdf",
    "topics":"Worked on some fluid dynamics C++ code. Very very slowly coding the SPH smoothing functions."},
{"date":"10-25-2024",
    "media-dir":"media/10-25-2024", "show-media":true,
    "recording":"https://youtu.be/-UG-3koKA1U",
    "notebook-dl":"streaming-10-25-2024.nb",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/stream-10-25-2024.nb",
    "notebook-pdf":"streaming-10-25-2024.pdf",
    "topics":"Kept going with the fluid dynamics. Got positioning and image drawing working in arbitrary dimension, and did a first pass at implementing annealing."}
];
function generateLinksList(links) {
    const ul=document.getElementById('twitch-ul');
    links.reverse();
    links.forEach(link => {
        const li=document.createElement('li');
        const elements=[];
        if(link.date)
            elements.push(`<span class="twitch-li">${link.date}</span>`);
        if(link.recording)
            elements.push(`<a href="${link.recording}">Recording</a>`);
        if(link['notebook-dl']||link['notebook-web']||link['notebook-pdf']){
            const notebookLinks=[];
            if(link['notebook-dl'])
                notebookLinks.push(`<a href="${link['media-dir']}/${link['notebook-dl']}">download</a>`);
            if(link['notebook-pdf'])
                notebookLinks.push(`<a href="${link['media-dir']}/${link['notebook-pdf']}">pdf</a>`);
            if(link['notebook-web'])
                notebookLinks.push(`<a href="${link['notebook-web']}">web</a>`);
            if(notebookLinks.length>0)
                elements.push(`Notebook: ${notebookLinks.join(', ')}`);
        }
        if(link['media-dir'] && link['show-media']!==false)
            elements.push(`<a href="${link['media-dir']}">Media directory</a>`);
        
        if(link.topics) {
            const inlineSingleTopic=false;
            const topicsArray = Array.isArray(link.topics) ? link.topics : [link.topics];
            if(topicsArray.length===1 && inlineSingleTopic){
                elements.push(`Topic: ${topicsArray[0]}`);
                li.innerHTML = elements.join('. ');
            } else { 
                li.innerHTML = elements.join('. ')+". ";
                const topicsUl = document.createElement('ul');
                topicsUl.className = 'topics-list';
                topicsArray.forEach(topic => {
                    const topicLi = document.createElement('li');
                    topicLi.innerHTML = topic;
                    topicLi.className = 'topic-item';
                    topicsUl.appendChild(topicLi);
                });
                li.appendChild(topicsUl);
            }
        } else {
            li.innerHTML = elements.join('. ')+". ";
        }
        ul.appendChild(li);
    });
}

// Add event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    generateLinksList(links);
});

</script>

