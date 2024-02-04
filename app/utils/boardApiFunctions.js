export function canWeaccessthisBoard(boardDoc, userEmail){
    if(boardDoc.visibility === "public"){
        return true;
    }
    if(boardDoc.visibility === "private" && boardDoc.allowedEmails.includes(userEmail)){
        return true;
    }
    return false;

}