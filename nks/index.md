---
layout: page
title: New Kind of Science Reading Group
---

These are the meeting notes and associated notebooks for a reading group on A New Kind of Science. Our goals in this reading group are to read (or re-read) Stephen Wolfram's A New Kind of Science, and also to collect the code snippets and ideas of all reading group attendees. At the end, we want to end up with curated notebooks containing all of our interesting ideas, questions, and code snippets 

We have meetings every Sunday at 10:00am PST / 11:00am CDMX.

Feel free to join us in the <a href="https://wolframinstitute.org/community">Wolfram Institute Community Discord</a>. Please note that you're expected to use your real identity in this server. You may have to search for the <a href="https://discord.com/channels/1031080662880505906/1269744710549770304">#nks_bookclub</a> channel.

## Meeting Recordings and Downloads

<!-- <ul>
<li><span class="nks-li">08/04/2024.</span> <a href="https://youtu.be/873tYMPYC5A">Recording</a>. Notebook: (<a href="media/Book club august 4th.nb">download</a>, <a href="media/Book club august 4th.pdf">pdf</a>, <a href="https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20august%204th.nb">web</a>)</li>
<li><span class="nks-li">08/11/2024.</span> <a href="https://youtu.be/m9dSA5_c570">Recording</a>. Notebook: (<a href="media/Book club august 11.nb">download</a>, <a href="media/Book club august 11.pdf">pdf</a>, <a href="https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20august%2011.nb">web</a>)</li>
<li><span class="nks-li">08/18/2024.</span> <a href="https://www.youtube.com/watch?v=FSEOXaPNSOE">Recording</a>. Notebook: (<a href="media/Book club august 18.nb">download</a>, <a href="media/Book club august 18.pdf">pdf</a>, <a href="https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20august%2018.nb">web</a>)</li>
<li><span class="nks-li">08/25/2024.</span> <a href="https://youtu.be/jlMeEEn6SGc">Recording</a>. Notebook: (<a href="media/Book club august 25.nb">download</a>, <a href="media/Book club august 25.pdf">pdf</a>, <a href="https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20august%2025.nb">web</a>)</li>
<li><span class="nks-li">09/01/2024.</span> Upcoming.</li>
</ul> -->
<ul id="nks-bookclub"></ul>

<script>

const links=[
{"date":"08-04-2024",
    "title":"Week 1",
    "recording":"https://youtu.be/873tYMPYC5A",
    "notebook-dl":"media/Book club august 4th.nb",
    "notebook-pdf":"media/Book club august 4th.pdf",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20august%204th.nb",
    "topics":"Discussion of chapter 1"
},
{"date":"08-11-2024",
    "title":"Week 2",
    "recording":"https://youtu.be/m9dSA5_c570",
    "notebook-dl":"media/Book club august 11.nb",
    "notebook-pdf":"media/Book club august 11.pdf",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20august%2011.nb",
    "topics":"Discussion of chapter 2, chapter 3. Nice plots of Length[Compress[automata]] here!"
},
{"date":"08-18-2024",
    "title":"Week 3",
    "recording":"https://www.youtube.com/watch?v=FSEOXaPNSOE",
    "notebook-dl":"media/Book club august 18.nb",
    "notebook-pdf":"media/Book club august 18.pdf",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20august%2018.nb",
    "topics":"Discussion of chapter 3, chapters 2 and 3 appendices."
},
{"date":"08-25-2024",
    "title":"Week 4",
    "recording":"https://youtu.be/jlMeEEn6SGc",
    "notebook-dl":"media/Book club august 25.nb",
    "notebook-pdf":"media/Book club august 25.pdf",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20august%2025.nb",
    "topics":"Discussion of chapter 4."
},
{"date":"09-01-2024",
    "title":"Week 5",
    "recording":"https://www.youtube.com/watch?v=__V4WuvXmnc",
    "notebook-dl":"media/Book club september 1.nb",
    "notebook-pdf":"media/Book club september 1.pdf",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20september%201.nb",
    "topics":"Discussion of chapter 4."
},
{"date":"09-08-2024",
    "title":"Week 6",
    "recording":"https://www.youtube.com/watch?v=DaKJul7iRvQ",
    "notebook-dl":"media/Book club september 8.nb",
    "notebook-pdf":"media/Book club september 8.pdf",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20september%208.nb",
    "topics":"Focusing on chapter 4. Properties of digit patterns, deep conversation involing von Neumann constructors."
},
{"date":"09-15-2024",
    "title":"Week 7",
    "recording":"https://www.youtube.com/watch?v=6JoLh1TDceE",
    "notebook-dl":"media/Book club september 15.nb",
    "notebook-pdf":"media/Book club september 15.pdf",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20september%2015.nb",
    "topics":"More on digit patterns. Discussion of chapter 5: CAs as we increase dimension."
},
{"date":"09-29-2024",
    "title":"Week 8",
    "recording":"https://www.youtube.com/watch?v=m0Sja1YLBps",
    "notebook-dl":"media/Book club september 29.nb",
    "notebook-pdf":"media/Book club september 29.pdf",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20september%2029.nb",
    "topics":"Discussion of chapter 5, start of chapter 6. Some starting discussion of the second law and the role of entropy in the separation of oil and water."
},
{"date":"10-06-2024",
    "title":"Week 9",
    "recording":"https://www.youtube.com/watch?v=CJ_k6cA3RFo",
    "notebook-dl":"media/Book club october 6.nb",
    "notebook-pdf":"media/Book club october 6.pdf",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20october%206.nb",
    "topics":"Discussion of chapter 6, starting discussion of chapter 7. Discussion of spinodal decomposition and hard sphere systems."
},
{"date":"10-13-2024",
    "title":"Week 10",
    "recording":"https://www.youtube.com/watch?v=aD2teJ4FcKA",
    "notebook-dl":"media/Book club october 13.nb",
    "notebook-pdf":"media/Book club october 13.pdf",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20october%2013.nb",
    "topics":"Talking about lots of notes on chapter 7 and 8, physical systems. Start discussion of fluids."
},
{"date":"10-20-2024",
    "title":"Week 11",
    "recording":"https://www.youtube.com/watch?v=AOFptSfMYMg",
    "notebook-dl":"media/Book club october 20.nb",
    "notebook-pdf":"media/Book club october 20.pdf",
    "notebook-web":"https://www.wolframcloud.com/obj/dmoore101/Published/Book%20club%20october%2020.nb",
    "topics":"Live-coding the fluid dynamics CA from chapter 8."
}
];

function generateLinksList(links) {
    const ul=document.getElementById('nks-bookclub');
    //links.reverse();
    links.forEach(link => {
        const li=document.createElement('li');
        const elements=[];
        if(link.title)
            elements.push(`<span class="nks-title">${link.title}</span>`);
        if(link.date)
            elements.push(`<span class="nks-li">${link.date}</span>`);
        if(link.recording)
            elements.push(`<a href="${link.recording}">Recording</a>`);
        if(link['notebook-dl']||link['notebook-web']||link['notebook-pdf']){
            const notebookLinks=[];
            if(link['notebook-dl'])
                notebookLinks.push(`<a href="${link['notebook-dl']}">download</a>`);
            if(link['notebook-pdf'])
                notebookLinks.push(`<a href="${link['notebook-pdf']}">pdf</a>`);
            if(link['notebook-web'])
                notebookLinks.push(`<a href="${link['notebook-web']}">web</a>`);
            if(notebookLinks.length>0)
                elements.push(`Notebook: ${notebookLinks.join(', ')}`);
        }
        if(link['media-dir'] && link['show-media']!==false)
            elements.push(`<a href="${link['media-dir']}">Media directory</a>`);
        
        if(link.topics) {
            const inlineSingleTopic=true;
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
<!-- <li><span class="nks-li">08/11/2024.</span> <a href="">Recording</a>. Notebook: (<a href="">download</a>, <a href="">pdf</a>, <a href="">web</a></li>-->


