
## title 
Creating a personal Brand and Design System

## description
Created a personal brand and design system that could be used for other work.

---

## overview

### label
Personal

### description
As I grow in my field I felt that I needed a design language of my own.

### sector
Digital Agency

### team Size
1

### location
Boston, Massachusetts

---

## problem
Every side project and portfolio piece I built had its own one-off buttons, cards, and color choices. Nothing carried over between projects, so each new build started from zero and looked visibly inconsistent with the last.

## approach
I defined a small set of design tokens, color, type and spacing, then built an accessible component library on top of them, treating my own work like client work with real documentation and reuse in mind.

---

## outcomes
- One token set and component library reused across every personal project.
- New pages assembled from existing primitives instead of rebuilt from scratch
- A consistent, accessible brand across my whole portfolio

---
## Discovery
Looking back across old projects, I didn't have a consistant style or I just recreated it again and again. For personal projects that might be fine, but when you are spending more time on items that could be already made. At the time I was working for Mapfre and was in the process of working on one that would be used when every our team had work.

"src": "/img/case-studies/ds1.png",
![[ds1.png]]

We read through some of the bigger design system at the time, Atlassian, Material, Shopify, and Apple, to see why they needed a system. It's the same reason all of these companies, including the one I was in, wanted an easy way to share their brand. Not just images and logo, but in the very tone their marketing heads would use. The colors were easy but trying to make sure red isn't the primary color for buttons was an up hill struggle.

Unlike many of the modern systems using Storybook or another tool. I went through and just made something that could be hosted on a file system. Not the best solution, but we didn't really have much choice. What does that mean? Nothing fancy, standard html, and es6. I worked with webpack to create a system that allowed me to fake imports, have scss, and then build a standard web page. This was used as a guide for the components that were built in sepereate projects.

I wanted something for my own projects that had my own style, like every other developer or designer.

"src": "/img/case-studies/ds1.png",![[ds1.png]]

## Building the system

Originally I was trying to do things from the ground up. What does that mean? I wanted to try and make something that was react base, but didn't use a react framework. I still wanted to keep SCSS and I still wanted to learn. Sometimes a headache isn't worth it. Fastforward to now and I've used Next.js and Tanstack but found the later to be the best approach. So, I'm revitalizing that system to something better.

I set design tokens first, then built accessible primitives on top of them. Documenting each one so future me could assemble new pages instead of reinventing components under deadline. At first I was designing in Adobe xD (and even before in Sketch), but I've found that figma was a good program. Next was working with colors and typography.

Now the colors I chose was really just an attempt to keep things clean. A flat black that had a bit of blue, white that had just a drop of grey, and bright robin's egg blue. One thing I found that keeping it clean made it easier to not get confused. The bright blue is a nice break from the monotone black and white. I wanted that same feeling with some of the other colors, so red was a bit neon and green was more of that minty version.

![[Pasted image 20260810002934.png]]

I wanted to keep that feeling with the components. I was digging the bold colors, bold borders and solid colors in a lot of designs I was seeing.  It made things clear and you could easily differentiate what active componets were. Now I don't have a big need for diferent components. THis system was for small projects and my style. Nothing world shattering.

## Results

Every new page in the portfolio now pulls from the same library. What used to take a day of one-off styling is now an afternoon of assembly, and accessibility is built in by default instead of patched in after.
