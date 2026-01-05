import{j as R}from"./jsx-runtime.ClP7wGfN.js";import{r as d}from"./index.DK-fsZOb.js";const b=1920*1080*4;let V=class{parentElement;canvasElement;gl;program=null;uniformLocations={};fragmentShader;rafId=null;lastRenderTime=0;totalFrameTime=0;speed=0;providedUniforms;hasBeenDisposed=!1;resolutionChanged=!0;textures=new Map;minPixelRatio;maxPixelCount;isSafari=W();uniformCache={};constructor(e,r,i,s,o=0,n=0,a=2,u=b){if(e instanceof HTMLElement)this.parentElement=e;else throw new Error("Paper Shaders: parent element must be an HTMLElement");if(!document.querySelector("style[data-paper-shader]")){const h=document.createElement("style");h.innerHTML=L,h.setAttribute("data-paper-shader",""),document.head.prepend(h)}const c=document.createElement("canvas");this.canvasElement=c,this.parentElement.prepend(c),this.fragmentShader=r,this.providedUniforms=i,this.totalFrameTime=n,this.minPixelRatio=a,this.maxPixelCount=u;const l=c.getContext("webgl2",s);if(!l)throw new Error("Paper Shaders: WebGL is not supported in this browser");this.gl=l,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),this.setSpeed(o),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this}initProgram=()=>{const e=F(this.gl,P,this.fragmentShader);e&&(this.program=e)};setupPositionAttribute=()=>{const e=this.gl.getAttribLocation(this.program,"a_position"),r=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,r);const i=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(i),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)};setupUniforms=()=>{const e={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([r,i])=>{if(e[r]=this.gl.getUniformLocation(this.program,r),i instanceof HTMLImageElement){const s=`${r}_aspect_ratio`;e[s]=this.gl.getUniformLocation(this.program,s)}}),this.uniformLocations=e};renderScale=1;parentWidth=0;parentHeight=0;resizeObserver=null;setupResizeObserver=()=>{this.resizeObserver=new ResizeObserver(([r])=>{r?.borderBoxSize[0]&&(this.parentWidth=r.borderBoxSize[0].inlineSize,this.parentHeight=r.borderBoxSize[0].blockSize),this.handleResize()}),this.resizeObserver.observe(this.parentElement),visualViewport?.addEventListener("resize",this.handleVisualViewportChange);const e=this.parentElement.getBoundingClientRect();this.parentWidth=e.width,this.parentHeight=e.height,this.handleResize()};resizeRafId=null;handleVisualViewportChange=()=>{this.resizeRafId!==null&&cancelAnimationFrame(this.resizeRafId),this.resizeRafId=requestAnimationFrame(()=>{this.resizeRafId=requestAnimationFrame(()=>{this.handleResize()})})};handleResize=()=>{this.resizeRafId!==null&&cancelAnimationFrame(this.resizeRafId);const e=visualViewport?.scale??1,r=window.innerWidth-document.documentElement.clientWidth,i=visualViewport?visualViewport.scale*visualViewport.width+r:window.innerWidth,s=Math.round(1e4*window.outerWidth/i)/1e4,o=this.isSafari?devicePixelRatio:devicePixelRatio/s,a=Math.max(o,this.minPixelRatio)*s*e,u=this.parentWidth*a,c=this.parentHeight*a,l=Math.sqrt(this.maxPixelCount)/Math.sqrt(u*c),h=a*Math.min(1,l),g=Math.round(this.parentWidth*h),p=Math.round(this.parentHeight*h);(this.canvasElement.width!==g||this.canvasElement.height!==p||this.renderScale!==h)&&(this.renderScale=h,this.canvasElement.width=g,this.canvasElement.height=p,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))};render=e=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn("Tried to render before program or gl was initialized");return}const r=e-this.lastRenderTime;this.lastRenderTime=e,this.speed!==0&&(this.totalFrameTime+=r*this.speed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.totalFrameTime*.001),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.speed!==0?this.requestRender():this.rafId=null};requestRender=()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)};setTextureUniform=(e,r)=>{if(!r.complete||r.naturalWidth===0)throw new Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);const i=this.textures.get(e);i&&this.gl.deleteTexture(i);const s=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,s),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.REPEAT),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.REPEAT),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,r);const o=this.gl.getError();if(o!==this.gl.NO_ERROR||s===null){console.error("Paper Shaders: WebGL error when uploading texture:",o);return}this.textures.set(e,s);const n=this.uniformLocations[e];if(n){const a=this.textures.size-1;this.gl.useProgram(this.program),this.gl.activeTexture(this.gl.TEXTURE0+a),this.gl.bindTexture(this.gl.TEXTURE_2D,s),this.gl.uniform1i(n,a);const u=`${e}_aspect_ratio`,c=this.uniformLocations[u];if(c){const l=r.naturalWidth/r.naturalHeight;this.gl.uniform1f(c,l)}}};areUniformValuesEqual=(e,r)=>e===r?!0:Array.isArray(e)&&Array.isArray(r)&&e.length===r.length?e.every((i,s)=>this.areUniformValuesEqual(i,r[s])):!1;setUniformValues=e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([r,i])=>{if(this.areUniformValuesEqual(this.uniformCache[r],i))return;const s=this.uniformLocations[r];if(!s){console.warn(`Uniform location for ${r} not found`);return}if(i instanceof HTMLImageElement)this.setTextureUniform(r,i);else if(Array.isArray(i)){let o=null,n=null;if(i[0]!==void 0&&Array.isArray(i[0])){const a=i[0].length;if(i.every(u=>u.length===a))o=i.flat(),n=a;else{console.warn(`All child arrays must be the same length for ${r}`);return}}else o=i,n=o.length;switch(n){case 2:this.gl.uniform2fv(s,o);break;case 3:this.gl.uniform3fv(s,o);break;case 4:this.gl.uniform4fv(s,o);break;case 9:this.gl.uniformMatrix3fv(s,!1,o);break;case 16:this.gl.uniformMatrix4fv(s,!1,o);break;default:console.warn(`Unsupported uniform array length: ${n}`)}}else typeof i=="number"?this.gl.uniform1f(s,i):typeof i=="boolean"?this.gl.uniform1i(s,i?1:0):console.warn(`Unsupported uniform type for ${r}: ${typeof i}`);this.uniformCache[r]=i})};getCurrentFrameTime=()=>this.totalFrameTime;setFrame=e=>{this.totalFrameTime=e,this.lastRenderTime=performance.now(),this.render(performance.now())};setSpeed=(e=1)=>{this.speed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)};setMaxPixelCount=(e=b)=>{this.maxPixelCount=e,this.handleResize()};setMinPixelRatio=(e=2)=>{this.minPixelRatio=e,this.handleResize()};setUniforms=e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())};dispose=()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),visualViewport?.removeEventListener("resize",this.handleVisualViewportChange),this.uniformLocations={},this.parentElement.paperShaderMount=void 0}};const P=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;

uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform float u_pxSize;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_objectHelperBox;

out vec2 v_responsiveUV;
out vec2 v_responsiveBoxSize;
out vec2 v_responsiveHelperBox;
out vec2 v_responsiveBoxGivenSize;

out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_patternHelperBox;

// #define ADD_HELPERS

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize, vec2 maxBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(maxBoxSize[0] / boxRatio, maxBoxSize[1]);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(maxBoxSize[0] / boxRatio, maxBoxSize[1]);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  vec2 maxBoxSize = vec2(max(u_resolution.x, givenBoxSize.x), max(u_resolution.y, givenBoxSize.y));
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================
  // Sizing api for graphic objects with fixed ratio
  // (currently supports only ratio = 1)

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize, maxBoxSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  #ifdef ADD_HELPERS
    v_objectHelperBox = uv;
    v_objectHelperBox *= objectWorldScale;
    v_objectHelperBox += boxOrigin * (objectWorldScale - 1.);
  #endif

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;


  // ===================================================


  // ===================================================
  // Sizing api for graphic objects with either givenBoxSize ratio or canvas ratio.
  // Full-screen mode available with u_worldWidth = u_worldHeight = 0

  v_responsiveBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  v_responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize, maxBoxSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / v_responsiveBoxSize;

  #ifdef ADD_HELPERS
    v_responsiveHelperBox = uv;
    v_responsiveHelperBox *= responsiveBoxScale;
    v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================


  // ===================================================
  // Sizing api for patterns
  // (treating graphics as a image u_worldWidth x u_worldHeight size)

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize, maxBoxSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  #ifdef ADD_HELPERS
    v_patternHelperBox = uv;
    v_patternHelperBox *= patternBoxScale;
    v_patternHelperBox += boxOrigin * (patternBoxScale - 1.);
  #endif

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  v_patternUV += .5;

  // ===================================================

}`;function E(t,e,r){const i=t.createShader(e);return i?(t.shaderSource(i,r),t.compileShader(i),t.getShaderParameter(i,t.COMPILE_STATUS)?i:(console.error("An error occurred compiling the shaders: "+t.getShaderInfoLog(i)),t.deleteShader(i),null)):null}function F(t,e,r){const i=E(t,t.VERTEX_SHADER,e),s=E(t,t.FRAGMENT_SHADER,r);if(!i||!s)return null;const o=t.createProgram();return o?(t.attachShader(o,i),t.attachShader(o,s),t.linkProgram(o),t.getProgramParameter(o,t.LINK_STATUS)?(t.detachShader(o,i),t.detachShader(o,s),t.deleteShader(i),t.deleteShader(s),o):(console.error("Unable to initialize the shader program: "+t.getProgramInfoLog(o)),t.deleteProgram(o),t.deleteShader(i),t.deleteShader(s),null)):null}const L=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }
  }
}`;function W(){const t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")&&!t.includes("android")}const M=`
in vec2 v_objectUV;
in vec2 v_responsiveUV;
in vec2 v_responsiveBoxGivenSize;
in vec2 v_patternUV;`,C={fit:"none",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},H={none:0,contain:1,cover:2},O=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,j=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,D=`
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
`,X=`
float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}
`,$=`
  color += 1. / 256. * (fract(sin(dot(.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - .5);
`,B={maxColorCount:10},N=`#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_scale;

uniform vec4 u_colors[${B.maxColorCount}];
uniform float u_colorsCount;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

${M}

out vec4 fragColor;

${O}
${D}
${j}
${X}


void main() {
  vec2 uv = v_patternUV;
  uv *= .005;

  float t = 0.0625 * u_time;

  float n1 = valueNoise(uv * 1. + t);
  float n2 = valueNoise(uv * 2. - t);
  float angle = n1 * TWO_PI;
  uv.x += 4. * u_distortion * n2 * cos(angle);
  uv.y += 4. * u_distortion * n2 * sin(angle);

  float iterationsNumber = ceil(clamp(u_swirlIterations, 1., 30.));
  for (float i = 1.; i <= iterationsNumber; i++) {
    uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
    uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
  }

  float proportion = clamp(u_proportion, 0., 1.);

  float shape = 0.;
  if (u_shape < .5) {
    vec2 checksShape_uv = uv * (.5 + 3.5 * u_shapeScale);
    shape = .5 + .5 * sin(checksShape_uv.x) * cos(checksShape_uv.y);
    shape += .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else if (u_shape < 1.5) {
    vec2 stripesShape_uv = uv * (2. * u_shapeScale);
    float f = fract(stripesShape_uv.y);
    shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
    shape += .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else {
    float shapeScaling = 5. * (1. - u_shapeScale);
    shape = smoothstep(.45 - shapeScaling, .55 + shapeScaling, 1. - uv.y + .3 * (proportion - .5));
  }

  float mixer = shape * (u_colorsCount - 1.);
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${B.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;
    float localMixer = clamp(mixer - float(i - 1), 0.0, 1.0);

    float localMixerStart = floor(localMixer);
    float smoothed = smoothstep(.5 - u_softness * .5, .5 + u_softness * .5, localMixer - localMixerStart);
    float localTStepped = localMixerStart + smoothed;

    localMixer = mix(localTStepped, localMixer, u_softness);

    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localMixer);
  }

  vec3 color = gradient.rgb;
  float opacity = gradient.a;

  ${$}

  fragColor = vec4(color, opacity);
}
`,G={checks:0,stripes:1,edge:2};function Y(t){if(Array.isArray(t))return t.length===4?t:t.length===3?[...t,1]:S;if(typeof t!="string")return S;let e,r,i,s=1;if(t.startsWith("#"))[e,r,i,s]=q(t);else if(t.startsWith("rgb"))[e,r,i,s]=k(t);else if(t.startsWith("hsl"))[e,r,i,s]=K(Z(t));else return console.error("Unsupported color format",t),S;return[_(e,0,1),_(r,0,1),_(i,0,1),_(s,0,1)]}function q(t){t=t.replace(/^#/,""),t.length===3&&(t=t.split("").map(o=>o+o).join("")),t.length===6&&(t=t+"ff");const e=parseInt(t.slice(0,2),16)/255,r=parseInt(t.slice(2,4),16)/255,i=parseInt(t.slice(4,6),16)/255,s=parseInt(t.slice(6,8),16)/255;return[e,r,i,s]}function k(t){const e=t.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt(e[1]??"0")/255,parseInt(e[2]??"0")/255,parseInt(e[3]??"0")/255,e[4]===void 0?1:parseFloat(e[4])]:[0,0,0,1]}function Z(t){const e=t.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt(e[1]??"0"),parseInt(e[2]??"0"),parseInt(e[3]??"0"),e[4]===void 0?1:parseFloat(e[4])]:[0,0,0,1]}function K(t){const[e,r,i,s]=t,o=e/360,n=r/100,a=i/100;let u,c,l;if(r===0)u=c=l=a;else{const h=(v,x,m)=>(m<0&&(m+=1),m>1&&(m-=1),m<.16666666666666666?v+(x-v)*6*m:m<.5?x:m<.6666666666666666?v+(x-v)*(.6666666666666666-m)*6:v),g=a<.5?a*(1+n):a+n-a*n,p=2*a-g;u=h(p,g,o+1/3),c=h(p,g,o),l=h(p,g,o-1/3)}return[u,c,l,s]}const _=(t,e,r)=>Math.min(Math.max(t,e),r),S=[0,0,0,1];function J(t){const e=d.useRef(void 0),r=d.useCallback(i=>{const s=t.map(o=>{if(o!=null){if(typeof o=="function"){const n=o,a=n(i);return typeof a=="function"?a:()=>{n(null)}}return o.current=i,()=>{o.current=null}}});return()=>{s.forEach(o=>o?.())}},t);return d.useMemo(()=>t.every(i=>i==null)?null:i=>{e.current&&(e.current(),e.current=void 0),i!=null&&(e.current=r(i))},t)}async function w(t){const e={},r=[],i=o=>{try{return o.startsWith("/")||new URL(o),!0}catch{return!1}},s=o=>{try{return o.startsWith("/")?!1:new URL(o,window.location.origin).origin!==window.location.origin}catch{return!1}};return Object.entries(t).forEach(([o,n])=>{if(typeof n=="string"){if(!i(n)){console.warn(`Uniform "${o}" has invalid URL "${n}". Skipping image loading.`);return}const a=new Promise((u,c)=>{const l=new Image;s(n)&&(l.crossOrigin="anonymous"),l.onload=()=>{e[o]=l,u()},l.onerror=()=>{console.error(`Could not set uniforms. Failed to load image at ${n}`),c()},l.src=n});r.push(a)}else e[o]=n}),await Promise.all(r),e}const U=d.forwardRef(function({fragmentShader:e,uniforms:r,webGlContextAttributes:i,speed:s=0,frame:o=0,minPixelRatio:n,maxPixelCount:a,...u},c){const[l,h]=d.useState(!1),g=d.useRef(null),p=d.useRef(null);d.useEffect(()=>((async()=>{const m=await w(r);g.current&&!p.current&&(p.current=new V(g.current,e,m,i,s,o,n,a),h(!0))})(),()=>{p.current?.dispose(),p.current=null}),[e,i]),d.useEffect(()=>{(async()=>{const m=await w(r);p.current?.setUniforms(m)})()},[r,l]),d.useEffect(()=>{p.current?.setSpeed(s)},[s,l]),d.useEffect(()=>{p.current?.setMaxPixelCount(a)},[a,l]),d.useEffect(()=>{p.current?.setMinPixelRatio(n)},[n,l]),d.useEffect(()=>{p.current?.setFrame(o)},[o,l]);const v=J([g,c]);return R.jsx("div",{ref:v,...u})});U.displayName="ShaderMount";function Q(t,e){for(const r in t){if(r==="colors"){const i=Array.isArray(t.colors),s=Array.isArray(e.colors);if(!i||!s){if(Object.is(t.colors,e.colors)===!1)return!1;continue}if(t.colors?.length!==e.colors?.length||!t.colors?.every((o,n)=>o===e.colors?.[n]))return!1;continue}if(Object.is(t[r],e[r])===!1)return!1}return!0}const f={params:{...C,rotation:0,speed:1,frame:0,colors:["#262626","#2e383d","#64a5ce","#ffffff"],proportion:.45,softness:1,distortion:.25,swirl:.8,swirlIterations:10,shapeScale:.1,shape:"checks"}},ee=d.memo(function({speed:e=f.params.speed,frame:r=f.params.frame,colors:i=f.params.colors,proportion:s=f.params.proportion,softness:o=f.params.softness,distortion:n=f.params.distortion,swirl:a=f.params.swirl,swirlIterations:u=f.params.swirlIterations,shapeScale:c=f.params.shapeScale,shape:l=f.params.shape,fit:h=f.params.fit,scale:g=f.params.scale,rotation:p=f.params.rotation,originX:v=f.params.originX,originY:x=f.params.originY,offsetX:m=f.params.offsetX,offsetY:z=f.params.offsetY,worldWidth:T=f.params.worldWidth,worldHeight:y=f.params.worldHeight,...A}){const I={u_colors:i.map(Y),u_colorsCount:i.length,u_proportion:s,u_softness:o,u_distortion:n,u_swirl:a,u_swirlIterations:u,u_shapeScale:c,u_shape:G[l],u_scale:g,u_rotation:p,u_fit:H[h],u_offsetX:m,u_offsetY:z,u_originX:v,u_originY:x,u_worldWidth:T,u_worldHeight:y};return R.jsx(U,{...A,speed:e,frame:r,fragmentShader:N,uniforms:I})},Q);function oe({darkColors:t,lightColors:e,...r}){const[i,s]=d.useState("dark");d.useEffect(()=>{const u=()=>{const l=document.documentElement.getAttribute("data-theme")||"dark";s(l)};u();const c=new MutationObserver(l=>{l.forEach(h=>{h.type==="attributes"&&h.attributeName==="data-theme"&&u()})});return c.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),()=>c.disconnect()},[]);const o={speed:.4,rotation:.5,style:{width:"100%",height:"100%",pointerEvents:"none"}},a=t&&e?i==="light"?e:t:r.colors;return R.jsx(ee,{...o,...r,colors:a,style:{...o.style,...r.style}},i)}export{oe as default};
