(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const style="",display=document.querySelector(".display"),buttons=document.querySelectorAll("button"),specialChar=["%","*","/","-","+","="];let output="";const calculate=btnValue=>{if(btnValue==="="&&output!=="")output=eval(output.replace("%","/100"));else if(btnValue==="AC")output="";else if(btnValue=="DEL")output=output.toString().slice(0,-1);else{if(output==""&&specialChar.includes(btnValue))return;output+=btnValue}display.value=output};buttons.forEach(u=>{u.addEventListener("click",o=>calculate(o.target.dataset.value))});