export default {
  cards: [0, 1, 2],
  entities: {
    cards: {
      0: {
        id: 'card-0',
        type: 'splash',
        splash: true,
        bgColor: '#3861F4',
        title: 'Welcome Ray',
        subtitle: `We can't wait to see you!`,
        content: `<img src="https://s3.amazonaws.com/qrtrmstr-internal/smiley.png" alt="Smiley" />`
      },
      1: {
        id: 'card-1',
        type: 'tiles',
        bgColor: 'transparent',
        title: 'Your team',
        subtitle: `We're excited to meet you Ray!`,
        content: [
        {
          id: 'richard123',
          name: 'Richard Hendricks',
          img: 'https://s3.amazonaws.com/qrtrmstr-internal/richard.png',
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde impedit quo explicabo ullam. Rerum laboriosam doloribus earum odit ducimus, quo! Animi quidem repudiandae recusandae perferendis sunt, voluptatibus non vel modi!'
        },
        {
          id: 'erlich123',
          name: 'Erlich Bachmann',
          img: 'https://s3.amazonaws.com/qrtrmstr-internal/erlich.png',
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde impedit quo explicabo ullam. Rerum laboriosam doloribus earum odit ducimus, quo! Animi quidem repudiandae recusandae perferendis sunt, voluptatibus non vel modi!'
        },
        {
          id: 'jared123',
          name: 'Jared (Donald) Dunn',
          img: 'https://s3.amazonaws.com/qrtrmstr-internal/jared.png',
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde impedit quo explicabo ullam. Rerum laboriosam doloribus earum odit ducimus, quo! Animi quidem repudiandae recusandae perferendis sunt, voluptatibus non vel modi!'
        },
        {
          id: 'dinesh123',
          name: 'Dinesh Chugtai',
          img: 'https://s3.amazonaws.com/qrtrmstr-internal/dinesh.png',
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde impedit quo explicabo ullam. Rerum laboriosam doloribus earum odit ducimus, quo! Animi quidem repudiandae recusandae perferendis sunt, voluptatibus non vel modi!'
        },
        {
          id: 'gilfoyle123',
          name: 'Bertram Gilfoyle',
          img: 'https://s3.amazonaws.com/qrtrmstr-internal/gilfoyle.png',
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde impedit quo explicabo ullam. Rerum laboriosam doloribus earum odit ducimus, quo! Animi quidem repudiandae recusandae perferendis sunt, voluptatibus non vel modi!'
        }
        ]
      },
      2: {
        id: 'card-2',
        type: 'map',
        bgColor: 'transparent',
        content: 'Hello I am a map component'
      }
    }
  }
};
