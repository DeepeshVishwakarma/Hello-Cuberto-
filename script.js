function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

locomotive()

// document.addEventListener("mousemove", function (dets) {
//   document.querySelector("#cursor").style.left = `${dets.x}px`
//   document.querySelector("#cursor").style.top = `${dets.y}px`
// })
// var face = document.querySelector("#face")
// var video = document.querySelector("#face video")
// video.addEventListener("mousemove",function(dets){
//     video.style.left =dets.x*.05 +"px"
//     video.style.top = dets.y*.05 +"px"
// })

// gsap.from("#page1 #video",{
//     top:"-200px",
//     width:"450px",
//     scrollTrigger: {
//         trigger:"#page1",
//         scrollers:"#main",
//         // markers:true,
//         start:"top 0%",
//         end:"top -50%",
//         scrub:3
//     }
// })
// gsap.from("#page1 p",{
//   rotate: 5,
//   y:100,
//   opacity:0,
//   stagger: 1,
//   duration:1,
//   // delay:1,
//   scrollTrigger: {
//       trigger:"#page1",
//       scroller:"body",
//       markers: true,
//       start:"top -120%",
//       end: "top -150%",
//       scrub:3
//   }
// })

// gsap.to("#page3 #video",{
//     width:"450px",
//     scrollTrigger: {
//         trigger:"#page3",
//         scrollers:"#main",
//         // markers:true,
//         start:"top -90%",
//         end:"top -120%",
//         scrub:3
//     }
// })



// gsap.to("#page7 loop h1",{
//   // animationName: "ranim",
//   ScrollTrigger: {
//     trigger:"#page7",
//     scrollers:"#main",
//     markers:true,
//     start:"top 50%",
//     end:"top 20%",
//     scrub:3
//   }
// })


