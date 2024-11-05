const helper = {
  thousand(num) {
    if (num) {
      let num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return num_parts.join(",");
    } else {
      return 0
    }
  },
  thousandMask(num) {
    if (num) {
      let num_parts = num.toString().split(",");
      num_parts[0] = num_parts[0].replace(/\./g,'')
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return [num_parts.join(",")];
    } else {
      return [0]
    }
  },
  removeThousand(num) {
    if (num) {
      let num_parts = num.toString().split(",");
      num_parts[0] = num_parts[0].replace(/\./g,'')
      return num_parts.join(",");
    } else {
      return 0
    }
  },
  dateFormatId(date) {
    if(date) {
      let theDate = new Date(date)
      let d = theDate.getDate()
      let m = theDate.getMonth() + 1
      let y = theDate.getFullYear()
      return `${d}-${m}-${y}`
    } else {
      return null
    }
  },
  dateIndo(date) {
    if(date) {
      let theDate = new Date(date)
      let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
      let month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
      let dy = theDate.getDay()
      let d = theDate.getDate()
      let m = theDate.getMonth()
      let y = theDate.getFullYear()
      return `${d} ${month[m]} ${y}`
    } else {
      return null
    }
  },
  dateTimeIndo(date) {
    if(date) {
      let theDate = new Date(date)
      let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
      let month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
      let dy = theDate.getDay()
      let d = theDate.getDate()
      let m = theDate.getMonth()
      let y = theDate.getFullYear()
      let h = theDate.getHours()
      let min = theDate.getMinutes()
      return `${days[dy]},${d} ${month[m]} ${y} ${h}:${min}`
    } else {
      return null
    }
  },
  dateFormatEn(date) {
    if(date) {
      let theDate = new Date(date)
      let d = theDate.getDate()
      let m = theDate.getMonth() + 1
      let y = theDate.getFullYear()
      return theDate
    } else {
      return null
    }
  },
  maxLength(s,l) {
    return String(s).substring(0,l);
  },
  limitWords(textToLimit, wordLimit) {
    if(textToLimit){
      let text = textToLimit.replace(/<[^>]+>/g, '');
      let ret = text.length > wordLimit ? text.substring(0, wordLimit) : text
      return  ret + '...';
    }
  },
  hari(days) {
    let d = days.split(',')
    let dy = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at','Sabtu']
    let fd = Number(d[0]) - 1
    let ld = Number(d[d.length - 1]) - 1
    let td = ''
    if(d.length > 1) {
      td = `${dy[fd]}-${dy[ld]}`
    } else {
      td = dy[fd]
    }
    return td
  },
  async checkImageExists(imageUrl) {
    try {
      const response = await fetch(imageUrl);
      if (response.ok) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
  daysLeft(targetDate) {
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
    
    // Convert target date to a Date object
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0); // Reset time to midnight
    
    // Calculate the difference in milliseconds
    const diffInMs = target - today;

    // Convert the difference from milliseconds to days
    const daysLeft = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    return daysLeft >= 0 ? daysLeft : 0; // Return 0 if the date is in the past
  }
}
export default helper