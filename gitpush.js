let fs = require("fs");
let path = require("path");

let inputArr = process.argv.slice(2);

let command = inputArr[0];
let dirpath = inputArr[1];


let groups = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

switch (command) {
    case "tree":
        console.log("tree coming soon");
        break;
    case "organize":
        organizefn(dirpath);
        break;
    case "help":
        console.log("help coming soon");
        break;
    default:
        console.log("please enter a valid command");
        break;

}



function organizefn(dirpath) {
    let destpath;
    if (dirpath == undefined) {
        console.log("Sorry Your Path is Undefined");
        return;
    }
    else {
        if (fs.existsSync(dirpath)) {
            destpath = path.join(dirpath, "Organized File");
            if (fs.existsSync(destpath) == false) {
                fs.mkdirSync(destpath);
                console.log("folder has been created in : " + dirpath);
            }

        }
        else {
            console.log("Sorry Your Path Does Not Exist !!! Kindly Enter A Valid Path");
            return;
        }
    }
   
    organizer(dirpath, destpath);
}

function organizer(sourcepath, destinationpath) {
    let lcount = 0;
    let ocount = 0;
    let unorg_entities = fs.readdirSync(sourcepath);
    for (let i = 0; i < unorg_entities.length; i++) {
        
        let unorg_entities_path = path.join(sourcepath, unorg_entities[i]);
        let isfile = fs.lstatSync(unorg_entities_path).isFile();
        if (isfile) {
          //  console.log(unorg_entities[i]);
     //segregation of files on the basis of their extensions.. 
            let category = getextensions(unorg_entities[i]);
            console.log(unorg_entities[i] + " -- file should be inside of --> " + category);
      // copy of segregated files in their respective categories using segregate function...
            segregatefiles( unorg_entities_path , destinationpath , category)

        }
    }

}

// this will copy the files in their respective categories under which they fall ..
function segregatefiles(srcpath_unorg, destinationpath, category) {
    let category_path = path.join(destinationpath, category)
    if (fs.existsSync(category_path) == false) {
        fs.mkdirSync(category_path);
    }
    let filename = path.basename(srcpath_unorg);
    let final_dest_path = path.join(category_path, filename);
    fs.copyFileSync(srcpath_unorg, final_dest_path);
}


// this will provide the extensions of all the unordered files that we have took from machine..
function getextensions(ext) {
    let ext_of_file = path.extname(ext);
    ext_of_file = ext_of_file.slice(1);
    for (let key in groups) {
        let type_of_file = groups[key]
        for (let i = 0; i < type_of_file.length; i++){
            if (ext_of_file == type_of_file[i]) {
                return key;
            }
           
        }
    }    
        return "others";
        
} 