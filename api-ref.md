API ref
=====

COURSES - /api/courses
-----
Show all the COURSES

```javascript
[
  {
    'title': 'Edge',
    'id': 'edge',
    'field_introduction': 'Welcome to the Cambridge Audio online training course for Edge.',
    'field_modules': ['2000', ...],
    "field_assessment":["1844"]
  }
]
```

COURSE [IGNORE] - /api/course/[nid]
-----
Show a specific COURSE's fields and it's MODULE's ids

```javascript
  [
    {
      'title': 'Edge',
      'id': 'edge',
      'field_introduction': 'Welcome to the Cambridge Audio online training course for Edge.',
      'field_modules': ['2000', ...],
      "field_assessment":["1844"]
    }
  ]
```

MODULES - /api/modules
-----
Show all MODULES and their fields ids

```javascript
[
  {
    "title":"Key Technology",
    "id": "key-technology",
    "field_structure":["1838","1839","1840"]
  },
  {
    // ... more MODULES 
  }
]
```

MODULE [IGNORE] - /api/module/[nid]
-----
Show a specific MODULE and it's LESSONS and ASSESSMENT ids

```javascript
[
  {
    "title":"Key Technology",
    "nid": "2000",
    "field_assessment":["1839"],
    "field_lessons":["1838","1840"]
  }
]
```

MODULE COMPONENTS - /api/module-components
-----
Show all the MODULE COMPONENTS, can contain lessons or tests

```javascript
[
  {
    'id': '1838',
    'field_headline': 'DC Servo',
    'field_body': '<p><span>A clean Alternating Current … </span></p>',
    'field_youtube_id': '',
    'type': 'lesson'
  },
  {
    // ...more LESSONS
  }
]
```

LESSON [IGNORE] - /api/lesson/[pid]
-----
Show the fields for a specific LESSON

```javascript
[
  {
    'id': '1838',
    'field_headline': 'DC Servo',
    'field_body': '<p><span>A clean Alternating Current … </span></p>',
    'field_youtube_id': ',
  }
]
```

ASSESSMENTS - /api/assessments
-----
Show all the ASSESSMENTS, these are used at the end of the COURSE

```javascript
[
  {
    "id":"1839",
    "type":"Multiple-Choice Question",
    "field_question":"Why doesn\u2019t Edge use capacitors?",
    "field_correct_choice":"Capacitors significantly change sound characteristics",
    "field_incorrect_choices": [
      "Capacitors are old technology", 
      "Capacitors reduce modulation in an AC signal"
    ],
  },
  {
    // ... more ASSESSMENTS
  }
]
```
  