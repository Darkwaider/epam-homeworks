const resetFunction = () => {
    const myNode = document.getElementById("result_rounds");
    const result = document.getElementById("result");
    result.innerHTML = "Result you - 0 computer - 0";
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}
export default resetFunction;
