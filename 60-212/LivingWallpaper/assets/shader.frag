#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float rand(vec2 co){
    return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
        
    float t = u_time;
    for(float i = 1.; i < 8.; i ++){
        st.x += .5 / (i) * i * sin(st.y * i * 5. + t *.2);//+t
        st.y += .5 / (i) * sin(i * st.x + t *.1);
    }
    gl_FragColor = mix(vec4(st, 1., 1.), vec4(1., st, 1.), sin(t * .5)+.5);
}