lst = [1, 2, 3]
function getlst() {
  return lst;
}
newlst = getlst();
newlst.pop();
console.log(lst)
console.log(newlst)