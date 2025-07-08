import React, { useEffect, useRef } from 'react';
import assets, { messagesDummyData, userDummyData } from '../assets/assets';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();

  // Filter messages where selectedUser is sender or receiver
  const filteredMessages = messagesDummyData.filter(
    (msg) =>
      (msg.senderId === selectedUser._id || msg.receiverId === selectedUser._id)
  );

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredMessages]);

  // Find user info of selectedUser for header
  const userInfo = userDummyData.find((u) => u._id === selectedUser._id) || {};

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg flex flex-col">
      <div className="flex items-center gap-3 py-3 px-4 border-b border-stone-500">
        {/* Header */}
        <img
          src={userInfo.profilePic || assets.avatar_icon}
          alt={userInfo.fullName || 'User'}
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {userInfo.fullName || 'Unknown User'}
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt="Back"
          className="md:hidden max-w-7 cursor-pointer"
        />
        <img src={assets.help_icon} alt="Help" className="max-md:hidden max-w-5" />
      </div>

      {/* Chat area */}
      <div className="flex flex-col flex-1 overflow-y-scroll p-3 pb-20">
        {filteredMessages.map((msg, index) => {
          const isSender = msg.senderId === selectedUser._id;
          // Get profile pic of message sender
          const senderInfo =
            userDummyData.find((u) => u._id === msg.senderId) || {};

          return (
            <div key={index}>
              <div
                className={`flex items-end gap-2 justify-end ${
                  isSender ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt="sent content"
                    className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
                  />
                ) : (
                  <p
                    className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                      isSender ? 'rounded-br-none' : 'rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </p>
                )}
                <div className="text-center text-xs">
                  <img
                    src={senderInfo.profilePic || assets.avatar_icon}
                    alt={senderInfo.fullName || 'User'}
                    className="w-7 rounded-full"
                  />
                  <p className="text-gray-500">{formatMessageTime(msg.createdAt)}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* Bottom input area */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-[#282142]">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-transparent"
          />
          <input type="file" id="image" accept="image/png, image/jpeg" hidden />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="Gallery" className="w-5 mr-2 cursor-pointer" />
          </label>
        </div>
        <img src={assets.send_button} alt="Send" className="w-7 cursor-pointer" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} className="max-w-16" alt="Logo" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
