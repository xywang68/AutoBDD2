/**
 * Perform an click action on the given element
 * @param  {String}  action             The action to perform on the target elementID
 * @param  {String}  targetElementIndex The nth element start from 1st,2nd,3rd,4th
 * @param  {String}  targetElement      target element selector
 * @param  {String}  parentElementIndex The nth parent element start from 1st,2nd,3rd,4th
 * @param  {String}  parentElement      parent element selector
 */
module.exports = (action, targetElementIndex, targetElement, parentElementIndex, parentElement) => {
    const targetElementIndexInt = (targetElementIndex) ? parseInt(targetElementIndex) - 1 : 0;
    const parentElementIndexInt = (parentElementIndex) ? parseInt(parentElementIndex) - 1 : 0;

    var myParentElement, myTargetElement;
    if (parentElement) {
        myParentElement = browser.elements(parentElement).value[parentElementIndexInt];
        myTargetElement = browser.elementIdElements(myParentElement.ELEMENT, targetElement).value[targetElementIndexInt];
    } else {
        myTargetElement = browser.elements(targetElement).value[targetElementIndexInt];
    }
    // console.log(myTargetElement);

    switch (action) {
        case 'moveTo':
            browser.moveTo(myTargetElement.ELEMENT);
            break;
        case 'clear':
            browser.elementIdClear(myTargetElement.ELEMENT);
            break;
        case 'tryClick':
            try {
                console.log('1st try with direct click ...')
                browser.elementIdClick(myTargetElement.ELEMENT);
            } catch (e) {
                console.log('2nd try with deep click ...')
                const deepClick = function(argument) { argument.click(); };
                browser.execute(deepClick, myTargetElement);          
            }
            break;
        case 'deepClick':
                console.log('do deep click ...')
                const deepClick = function(argument) { argument.click(); };
                browser.execute(deepClick, myTargetElement);          
                break;
        case 'click':
        default:
            browser.elementIdClick(myTargetElement.ELEMENT);
            break;
    }
};

