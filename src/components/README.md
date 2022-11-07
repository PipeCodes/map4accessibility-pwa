Components Currently Built for the MAP4ACCECCIBILITY APP:
- TopBar
- CustomButton
- DarkOverlay
- ColorsPallet
- CustomInput

When Implementing a new component the following css fields have to be dynamic using Redux(Use Currently Built Ones as reference):
- Font-Size
- Font
- Text-Decoration
- Animation EX: animation: ${(props) => updateAnimation('animation example', props.animation)};
- Background-Color
