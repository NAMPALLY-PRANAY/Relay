export function formatMessageTime(date)
{
    return new Date(date).toLocaleTimeString("en-US",{
        hour:"2-dight",
        minute: "2-digit",
        hour12 : false,
    })
}