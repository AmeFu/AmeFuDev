<template>
    <canvas id="mouseFollow" width="100%" height="100%"></canvas>
</template>

<script>
    export default {
        mounted() {
            this.init()
        },
        methods: {
            init() {
                class Particle{
                    constructor(opts){
                        this.x=0
                        this.y=0
                        this.r=0
                        this.vx=0
                        this.vy=0
                        this.fillStyle='#000'
                        this.strokeStyle='rgba(0, 0, 0, 0)'
                        this.theta=randomNum([0,Math.PI])
                        Object.assign(this,opts)
                        return this
                    }
                    render(ctx){
                        let{x,y,r,vx,vy,fillStyle,strokeStyle}=this
                        ctx.save()
                        ctx.translate(x,y)
                        ctx.fillStyle=fillStyle
                        ctx.beginPath()
                        ctx.arc(0,0,r,0,2*Math.PI)
                        ctx.fill()
                        ctx.restore()
                        return this
                    }
                }
                function randomNum(arr,int){
                    const max=Math.max(...arr)
                    const min=Math.min(...arr)
                    const num=Math.random()*(max-min)+min
                    return int?Math.round(num):num
                }
			    function randomColor(colors){
                    return colors[randomNum([0,colors.length-1],true)]
                }
			    const canvas=document.querySelector('#mouseFollow')
			    const ctx=canvas.getContext('2d')
			    let W=canvas.width=window.innerWidth
			    let H=canvas.height=window.innerHeight
			    let mouse={x:W/2,y:H/2}
			    let particles=[],particleNum=0
			    let colors=['#69D2E7','#A7DBD8','#E0E4CC','#F38630','#FA6900','#FF4E50','#F9D423'];let force,theta
			    canvas.addEventListener('mousemove',function(e){
                    mouse.x=e.clientX
                    mouse.y=e.clientY
                })
			    canvas.addEventListener('mouseout',function(){
                    mouse={x:W/2,y:H/2}
                })
			    function createParticle(){
                    for(let i=0;i<particleNum;i++){
                        particles.push(
                            new Particle(
                                {
                                    x:mouse.x,
                                    y:mouse.y,
                                    r:randomNum([5,40]),
                                    vx:Math.sin(theta)*force,
                                    vy:Math.cos(theta)*force,
                                    fillStyle:randomColor(colors),
                                    wander:randomNum([0.5,2]),
                                    drag:randomNum([0.9,0.99])
                                }
                            )
                        )
                    }
                }
                function move(p,i){
                    p.x+=p.vx
                    p.y+=p.vy
                    p.vx*=p.drag
                    p.vy*=p.drag
                    p.theta+=randomNum([-0.5,0.5])*p.wander
                    p.vx+=Math.sin(p.theta)*0.1
                    p.vy+=Math.cos(p.theta)*0.1
                    p.r*=0.96
                    if(p.r<=0.5){
                        particles.splice(i,1)
                    }
                }
                function draw(p,i){
                    p.render(ctx)
                };
                (function updating(){
                    window.requestAnimationFrame(updating)
                    ctx.clearRect(0,0,W,H)
                    ctx.globalCompositeOperation='lighter'
                    particleNum=randomNum([1,4])
                    force=randomNum([2,8])
                    theta=randomNum([0,2*Math.PI])
                    createParticle()
                    particles.forEach(move)
                    particles.forEach(draw)
                })()
            }
        }   
    }
</script>