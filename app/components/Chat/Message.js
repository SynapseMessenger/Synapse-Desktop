/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

import React from 'react';
import classNames from 'classnames';
import formatDate from '../../utils/format_date';

 const Message = (props) => {
   const { text, time, isOwn } = props;
   const wrapperClassnames = classNames('col', 's10', {
       'own-user-message-wrapper': isOwn,
       'other-user-message-wrapper': !isOwn
     });

     const messageClassnames = classNames('conversation-message', {
       'own-user-message': isOwn,
       'other-user-message': !isOwn
     });

     const formatedTime = formatDate(new Date(time));

   return (
     <div className={wrapperClassnames}>
       <div className={messageClassnames}>
         <div className="message-text">
           {text}
         </div>
         <div className="message-time">
           {formatedTime}
         </div>
       </div>
     </div>
   )
 };

 export default Message;
