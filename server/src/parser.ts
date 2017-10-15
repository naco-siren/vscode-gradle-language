/**
 * Return the scope's heading of the closure containing the cursor
 * 
 * @param doc the TextDocument that is being edited
 * @param pos the zero-based index of the cursor's position
 */
export function getClosureHeading(doc: string, pos: number) : string {
    /* Find the opening curly bracket of current closure */
    var stack = [];
	var i = pos - 1;
	for (; i >= 0; i--) {
        let ch = doc.charAt(i);
		if (ch == '}') {
			stack.push(i);
		} else if (ch == '{') {
			if (stack.length == 0) {
				break;
			} else {
				stack.pop();
			}
		}
	}

    /* Find the heading of this closure */
	var start = i - 1, end = i - 1;
	var inWords = false;
	for (; start >= 0; start--) {
        let ch = doc.charAt(start);
        
        // Find the end of the words
        if (!inWords) {
            if (ch == '\n' || ch == '\r') {
                return "";
            } else if (ch == ' ' || ch == '\t') {
                continue;
            } else {
                inWords = true;
                end = start;
            }
        // Find the start of the words
        } else {
            if (ch == '\n' || ch == '\r') {
                start++;
                break;
            }
        }
	}

    /* Process and return the subject */
    let heading = doc.substring(start, end + 1).trim();
    return heading;
}


// export function parseClosureHeading(heading: string) : string[] {

// }