API ref
=====

COURSES - /api/courses
-----
Shows all the COURSES

```javascript
{
  "courses": {
    "2003": {
      "nid": [
        {
          "value": 2003
        }
      ],
      "title": [
        {
          "value": "Edge"
        }
      ],
      "field_introduction": [
        {
          "value": "<p>Welcome to the Cambridge Audio online training module for Edge.</p>\r\n\r\n<p>Five decades ago our founders had a vision – to create hi-fi systems that delivered the Great British sound into people’s homes. Nothing added, nothing taken away.</p>\r\n\r\n<p>One of these talented engineers, Professor Gordon Edge, was the brains behind the innovation and design of our first product – the ground-breaking P40 integrated amplifier. In recognition of our heritage, we developed Edge.The embodiment of Cambridge Audio’s signature Great British Sound and the pinnacle of 50 years of Hi-Fi expertise.</p>\r\n\r\n<p>During this module you will find out about some of the history of Cambridge Audio, our listening philosophy and the key technologies that drive Edge.</p>\r\n",
        }
      ],
      "field_modules": [
        {
          "target_id": 2004,
        },
        {
          "target_id": 2005,
        },
        {
          "target_id": 2006,
        },
        {
          "target_id": 2007,
        }
      ],
      "field_course_assessment": [
        {
          "target_id": 1850,
        },
        {
          "target_id": 1851,
        },
        {
          "target_id": 1852,
        },
        {
          "target_id": 1853,
        },
        {
          "target_id": 1854,
        },
        {
          "target_id": 1855,
        }
      ]
    }
  }
}
```

MODULES - /api/modules
-----
Show all MODULES and their fields ids

```javascript
{
  "modules": {
    "2004": {
      "nid": [
        {
          "value": 2004
        }
      ],
      "title": [
        {
          "value": "50 Years of Cambridge Audio"
        }
      ],
      "field_add_components": [
        {
          "target_id": 1848,
        },
        {
          "target_id": 1856,
        },
        {
          "target_id": 1857,
        },
        {
          "target_id": 1858,
        },
        {
          "target_id": 1859,
        },
        {
          "target_id": 1860,
        },
        {
          "target_id": 1861,
        },
        {
          "target_id": 1862,
        },
        {
          "target_id": 1863,
        },
        {
          "target_id": 1864,
        },
        {
          "target_id": 1865,
        }
      ],
    },
  }
}
```

COMPONENTS - /api/components
-----
Show all the MODULE COMPONENTS, can contain lessons or tests

```javascript
{
  "components": {
    "1847": {
      "id": [
        {
          "value": 1847
        }
      ],
      "type": [
        {
          "target_id": "lesson",
        }
      ],
      "field_body": [
        {
          "value": "<p>Some text to introduce Edge</p>\r\n",
        }
      ],
      "field_headline": [
        {
          "value": "Lesson 1"
        }
      ],
      "field_image": [
        {
          "alt": "1968",
          "title": "",
          "width": 1958,
          "height": 289,
          "url": "http://localhost/dylan/sites/default/files/2018-03/1968.png"
        }
      ],
      "field_youtube_id": [
        {
          "value": "CTAud5O7Qqk"
        }
      ]
    },
    "1849": {
      "id": [
        {
          "value": 1849
        }
      ],
      "type": [
        {
          "target_id": "question",
        }
      ],
      "field_correct_choice": [
        {
          "value": "Edge Introduction Answer"
        }
      ],
      "field_incorrect_choices": [
        {
          "value": "Edge Introduction Incorrect answer 1"
        },
        {
          "value": "Edge Introduction Incorrect answer 2"
        },
        {
          "value": "Edge Introduction Incorrect answer 3"
        }
      ],
      "field_question": [
        {
          "value": "Edge Introduction Question "
        }
      ]
    }
  }
}
```


  