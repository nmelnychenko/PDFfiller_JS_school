'use strict';

var params = {
  lines: [
    {
      background: "#00F",
      updateTime: 1000,
      elements: [
        {
          background: "#00F",
          width: 25
        },
        {
          background: "#00F",
          width: 50
        }
      ]
    },
    {
      background: "#00F",
      updateTime: 1000,
      elements: [
        {
          background: "#789",
          width: 25
        },
        {
          background: "#345",
          width: 25
        }
      ]
    },
    {
      background: "#78F",
      updateTime: 1000,
      elements: [
        {
          background: "#056",
          width: 50
        },
        {
          background: "#056",
          width: 50
        },
        {
          background: "#04F",
          width: 25
        }
      ]
    }
  ]
};

var app = document.querySelector("#app");

function colorGenerator() {
  var hexDigits = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F"
  ];
  var color = "#";

  for (var i = 0; i < 6; i++) {
    color += hexDigits[Math.floor(Math.random() * Math.floor(16))];
  }

  return color;
}

function generateLines() {
  var line = document.createElement("div");
  app.style.display = "flex";
  app.style.flexDirection = "column";
  app.style.height = "100vh";

  if (params.lines.length) {
    app.appendChild(line).classList.add("line");

    if (params.lines.length > 1) {
      for (var i = 1; i < params.lines.length; i++) {
        var duplicateLine = line.cloneNode(true);
        app.appendChild(duplicateLine);
      }
    }
  }
}

function generateElements() {
  [].slice
    .call(document.querySelectorAll(".line"))
    .forEach(function(item, index) {
      var element = document.createElement("div");
      var line = params.lines[index];

      item.style.display = "flex";
      item.style.flexGrow = "1";
      item.style.background = line.background;

      if (line.elements.length) {
        item.appendChild(element).classList.add("element");

        if (line.elements.length > 1) {
          for (var i = 1; i < line.elements.length; i++) {
            var duplicateElement = element.cloneNode(true);
            item.appendChild(duplicateElement);
          }
        }

        [].slice.call(item.childNodes).forEach(function(child, childIndex) {
          child.style.flexBasis =
            line.elements[childIndex].width.toString() + "%";
          child.style.background = line.elements[childIndex].background;
        });
      }
    });
}

generateLines();
generateElements();

[].slice
  .call(document.querySelectorAll(".line"))
  .forEach(function(item, index) {
    var line = params.lines[index];
    setInterval(function() {
      item.style.background = colorGenerator();
    }, line.updateTime);
  });


/*
  Обновляются цвета фона только линий, так как в задании не описано про обновление цвета фона элементов.

  Изначально планировал реализовать используя ES6 (let/const, map, arrow functions, template strings), но смутило обьявление через var входящих данных.
*/