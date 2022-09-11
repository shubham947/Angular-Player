import { Media } from "./media.model";

export class PlaylistItem {
    media:Media;
    next?:PlaylistItem;
    prev?:PlaylistItem;
    
    constructor(media:Media) {
        this.media = media;
    }

    static hasSameMediaSrc(p1:PlaylistItem, p2:PlaylistItem) {
        return p1.media.src === p2.media.src;
    }
    
    // Inquiry functions
    hasNext() { return this.next ? true : false; }

    hasPrev() { return this.prev ? true : false; }
}

export class Playlist {
    id?:string;
    // Current will store currently playing item, on stopping it will be null
    current?:PlaylistItem;
    head?:PlaylistItem;
    tail?:PlaylistItem;
    itemCount:number = 0;

    constructor(item?:PlaylistItem) {
        if (item) {
            this.head = item;
            this.updateTail(item);
        }
    }

    static getLastItemFrom(item:PlaylistItem):PlaylistItem {
        while (item.hasNext()) {
            item = item.next!;
        }
        return item;
    }

    static getItemsCount(item:PlaylistItem):number {
        let count = 1;
        while (item.hasNext()) {
            item = item.next!;
            count++;
        }
        return count;
    }

    static mediaArrToPaylistItems(playlist:Media[]):PlaylistItem {
        let pl = new PlaylistItem(playlist[playlist.length-1]);
		for (let i = playlist.length-2; i>=0;  i--) {
			let tempPl = new PlaylistItem(playlist[i]);
			tempPl.next = pl;
			pl.prev = tempPl;
			pl = tempPl;
		}
        return pl;
    }


    // Reset this playlist
    resetPlaylist() {
        this.head = undefined;
        this.tail = undefined;
        this.current = undefined;
        this.itemCount = 0;
    }

    // Initialize playlist with mediaItems
    initializePlaylist(mediaItems:Media[]) {
        // Reseting
        this.resetPlaylist();
        // Adding new items to playlist
        let playlistItems = Playlist.mediaArrToPaylistItems(mediaItems);
		this.appendPlaylist(playlistItems);
        this.current = this.head;
    }

    // Update head to add items at beginning
    updateHead(item:PlaylistItem) {
        let oldHead = this.head;
        this.head = item;
        this.itemCount++;
        while (item.hasNext()) {
            item = item.next!;
            this.itemCount++;
        }
        if (oldHead) {
            oldHead.prev = item;
            item.next = oldHead;
        } else { this.tail = item; }
    }

    // Update tail after item is added at end
    updateTail(item:PlaylistItem) {
        while (item.hasNext()) {
            item = item.next!;
            this.itemCount++;
        }
        this.tail = item;
        this.itemCount++;
    }

    // Add items at end
    appendPlaylist(item:PlaylistItem, atHead?:boolean) {
        if (atHead) return this.updateHead(item);
        
        if (this.isEmpty()) {
            this.head = item;
        } else if (this.tail) {
            item.prev = this.tail;
            this.tail.next = item;
        }
        this.updateTail(item);
    }

    // Append item after current, update tail if req, update itemCount
    addNext(item:PlaylistItem) {
        if (this.current) {
            this.itemCount += Playlist.getItemsCount(item);
            let tempNext = this.current.next;
            item.prev = this.current;
            this.current.next = item;
            // Update links at end of item
            let lastItem = Playlist.getLastItemFrom(item);
            if (tempNext) {
                tempNext.prev = lastItem;
                lastItem.next = tempNext;
            } else {
                this.tail = lastItem;
            }
        } else {
            this.appendPlaylist(item, true);
            this.current = item;
        }
    }

    // Remove an existing PlaylistItem from Playlist
    remove(item:PlaylistItem) {
        if (!this.contains(item)) return;
        
        let prev = item.prev;
        let next = item.next;
        if (next) { next.prev = prev; }
        if (prev) { prev.next = next; }
        this.itemCount--;
        return item.media;
    }
    
    // Inquiry functions
    // Check if Playlist is empty
    isEmpty():boolean { return this.head ? false : true; }

    // Check whether this playlist contains the item
    contains(item:PlaylistItem):boolean {
        let start = this.head;
        while(start) {
            if (item === start) {
                return true;
            }
            start = start.next;
        }
        return false;
    }

    // Get PlaylistItem at index
    getPlaylistItemAt(index:number):PlaylistItem | undefined {
        let item = this.head;
        while (index > 0 && item?.hasNext()) {
            item = item.next;
            index--;
        }
        return item;
    }

    // Count number of items in this playlist
    countPlaylistItems():number {
        let item = this.head;
        let count = 0;
        while(item) {
            count++;
            item = item.next;
        }
        this.itemCount = count;
        return count;
    }
}